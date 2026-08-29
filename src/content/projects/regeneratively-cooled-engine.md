---
title: "Regeneratively Cooled Liquid Rocket Engine"
description: "Combustion chamber sizing, preliminary CAD, and injector design for a 2,000 lbf regeneratively cooled liquid rocket engine."
date: "2026-01-01"
status: "in-progress"
tags: ["propulsion", "liquid rockets", "regenerative cooling", "additive manufacturing", "Python"]
image: ""
draft: false
---

## Overview

I'm working with a team of engineers at CU SRL to develop a regeneratively cooled liquid rocket engine capable of 2,000 lbf of thrust. My work spans the combustion chamber sizing math, preliminary CAD, and the injector plate itself.

<!--
  <AstroImage src="/images/regen/full-assembly-cad.png" alt="Regen engine CAD assembly" figNo="01" caption="2,000 LBF REGEN ENGINE — PRELIMINARY ASSEMBLY, FUSION 360" />
-->

## Combustion chamber math

Before any CAD work started, the combustion chamber had to be sized from first principles using CEA outputs as the performance baseline.

I had already completed a simpler version of this for the taipan engine, so i just added a little bit more complexity to each process until i saw it had reached a good point. I used many parameter to help size the image and ended up rewriting a lot of heat transfer equations and flow uniformity checks within the python script. I still dont fully understand how these equations are derived or what their biggest limitations are, but being able to have a baseline to start with was really important. This was also made during the very beginning stages of this rockets engineering so, I made sure to use plenty of figures, graphs, and charts to help deliver the information I was gathering to the rest of my team. 

```python
import numpy as np
import math
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import pandas as pd
from rocketcea.cea_obj import CEA_Obj
import os

# ==================== USER CONFIGURATION ====================
AMBIENT_PRESSURE = 12.18316997  # psia (Boulder, CO)
R  = 1545.35
G0 = 32.174                     # ft/s²

# ==================== FIXED DESIGN POINT ====================
THRUST = 2000.0   # lbf
PC     = 500.0    # psia
OF     = 1.8      # O/F ratio

# ==================== EXPANSION RATIO SWEEP ====================
EPS_RANGE = [4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5,
             8.0, 8.5, 9.0, 9.5, 10.0, 'optimal']

# ==================== NOZZLE CONFIGURATIONS ====================
HALF_ANGLE_DEG = 15.0   # conical diverging half-angle

NOZZLE_CONFIGS = {
    'conical': {
        'eta_div': (1 + math.cos(math.radians(HALF_ANGLE_DEG))) / 2,
        'label':   f'Conical {HALF_ANGLE_DEG:.0f}°',
        'color':   'steelblue',
        'ls':      '-',
    },
    'bell_80': {
        'eta_div': 0.990,
        'label':   '80% Bell',
        'color':   'darkorange',
        'ls':      '--',
    },
    'bell_90': {
        'eta_div': 0.995,
        'label':   '90% Bell',
        'color':   'green',
        'ls':      '-.',
    },
    'bell_moc': {
        'eta_div': 0.998,
        'label':   'MOC Bell',
        'color':   'purple',
        'ls':      ':',
    },
}

# Efficiency factors
# Cf is split into two independent terms:
#   eta_cf_friction — boundary layer, skin friction, flow non-uniformity (nozzle-type independent)
#   eta_div         — divergence loss (geometry dependent, set per nozzle type above)
#   ETA_CF = eta_cf_friction * eta_div  (computed per nozzle in the loop)
ETA_CF_FRICTION = 0.970
ETA_CSTAR       = 0.92    # combustion efficiency

# ==================== DESIGN CONSTRAINTS ====================
MAX_EXIT_DIAMETER  = 6.0     # inches
MAX_PC             = 500.0   # psia
WALL_THICKNESS     = 0.120   # inches
CONTRACTION_RATIO  = 5.0     # Ac/At  — also sets the eps > CR floor
MATERIAL_YIELD     = 35000   # psi  (304 SS annealed ~35 ksi)
MIN_FOS            = 2.0     # minimum factor of safety, hoop stress
MIN_DE_DC_RATIO    = 1.15    # geometric minimum (exit diam / chamber diam)
L_STAR             = 45.0    # inches  (LOX/RP-1 residence time)

# Flow separation Pe/Pa limits  (exit pressure / ambient pressure)
SEP_SUMMERFIELD  = 0.35   # classical lower bound — separation likely
SEP_SCHMUCKER    = 0.40   # intermediate Schmucker criterion
SEP_CONSERVATIVE = 0.45   # conservative design limit  ← used for pass/fail

# ==================== STARTUP VALIDATION ====================
assert THRUST > 0 and PC > 0 and OF > 0, "Design point values must be positive"
assert CONTRACTION_RATIO > 1.0,           "Contraction ratio must be > 1"

# ==================== CEA INITIALIZATION ====================
cea = CEA_Obj(oxName='LOX', fuelName='RP1')
results = []

# ==================== SWEEP ====================
nozzle_names = list(NOZZLE_CONFIGS.keys())
total = len(nozzle_names) * len(EPS_RANGE)

print("=" * 70)
print("LOX/RP-1 NOZZLE CONFIGURATION TRADE STUDY")
print(f"  Fixed point : Thrust = {THRUST:.0f} lbf | Pc = {PC:.0f} psia | O/F = {OF:.1f}")
print(f"  Altitude    : Boulder, CO  ({AMBIENT_PRESSURE:.4f} psia)")
print(f"  Nozzle types: {', '.join(NOZZLE_CONFIGS[n]['label'] for n in nozzle_names)}")
print(f"  Eps values  : {len(EPS_RANGE)}  ({len(EPS_RANGE)-1} numeric + optimal)")
print(f"  Total cases : {total}")
print("=" * 70)

for nozzle_name in nozzle_names:
    cfg     = NOZZLE_CONFIGS[nozzle_name]
    eta_div = cfg['eta_div']
    eta_cf  = ETA_CF_FRICTION * eta_div     # total nozzle efficiency

    for eps_setting in EPS_RANGE:

        # ---- Expansion ratio ----
        if eps_setting == 'optimal':
            pc_over_pe = PC / AMBIENT_PRESSURE
            eps = cea.get_eps_at_PcOvPe(
                Pc=PC, MR=OF, PcOvPe=pc_over_pe, frozen=1)
            eps_label = 'optimal'
        else:
            eps       = float(eps_setting)
            eps_label = f'{eps:.1f}'
            # Recompute pc_over_pe from CEA for this fixed eps
            pc_over_pe = PC / (PC / cea.get_PcOvPe(
                Pc=PC, MR=OF, eps=eps, frozen=1))

        # Exit pressure and separation ratio
        pe          = PC / pc_over_pe
        pe_pa_ratio = pe / AMBIENT_PRESSURE

        # ---- CEA performance — Cf via get_PambCf (self-consistent single call) ----
        # This avoids the frozen/equilibrium mismatch of deriving Cf from
        # separate get_Isp and get_Cstar calls.
        cf_ideal = cea.get_PambCf(
            Pamb=AMBIENT_PRESSURE, Pc=PC, MR=OF, eps=eps)[0]
        cstar_ideal = cea.get_Cstar(Pc=PC, MR=OF)
        isp_ideal = cf_ideal * cstar_ideal / G0

        # ---- Thermodynamic stations ----
        (tc, tt, te)     = cea.get_Temperatures(Pc=PC, MR=OF, eps=eps, frozen=1)
        (mw_c, gamma_c)  = cea.get_Chamber_MolWt_gamma(Pc=PC, MR=OF)
        (mw_t, gamma_t)  = cea.get_Throat_MolWt_gamma(Pc=PC, MR=OF)
        (mw_e, gamma_e)  = cea.get_exit_MolWt_gamma(Pc=PC, MR=OF, eps=eps, frozen=1)

        # ---- Effective performance (nozzle-type-dependent) ----
        cstar_eff = ETA_CSTAR * cstar_ideal
        cf_eff    = eta_cf    * cf_ideal        # eta_cf includes eta_div
        isp_eff   = cf_eff * cstar_eff / G0

        # ---- Geometry ----
        at_sq_in    = THRUST / (cf_eff * PC)
        dt_in       = 2 * math.sqrt(at_sq_in / math.pi)
        ae_sq_in    = at_sq_in * eps
        de_in       = 2 * math.sqrt(ae_sq_in / math.pi)
        ac_sq_in    = CONTRACTION_RATIO * at_sq_in
        dc_in       = 2 * math.sqrt(ac_sq_in / math.pi)
        de_dc_ratio = de_in / dc_in
        vc_in3      = L_STAR * at_sq_in
        lc_in       = vc_in3 / ac_sq_in

        # ---- Mass flows ----
        mdot_total = THRUST / isp_eff
        mdot_ox    = mdot_total * (OF / (1 + OF))
        mdot_fuel  = mdot_total / (1 + OF)

        # ---- Structural — hoop stress on chamber barrel ----
        hoop_stress = PC * (dc_in / 2) / WALL_THICKNESS
        fos         = MATERIAL_YIELD / hoop_stress

        # ---- Bartz throat heat flux proxy ----
        # Simplified Bartz correlation, retaining dominant terms:
        #   q ∝ (Pc / c*_eff)^0.8  ×  Tc^0.9  /  Dt^0.2
        # Drops: μ^0.2·cp/Pr^0.6, (Dt/Rc)^0.1, σ correction
        # Valid for relative comparison across nozzle types at fixed Pc/OF.
        bartz_proxy = (
            (PC / cstar_eff) ** 0.8
            * (tc ** 0.9)
            / (dt_in ** 0.2)
        )

        # ---- Flow separation flags ----
        sep_summerfield  = pe_pa_ratio < SEP_SUMMERFIELD
        sep_schmucker    = pe_pa_ratio < SEP_SCHMUCKER
        sep_conservative = pe_pa_ratio < SEP_CONSERVATIVE   # pass/fail driver

        # ---- Geometric validity ----
        eps_cr_valid = eps > CONTRACTION_RATIO   # De must be wider than Dc
        de_dc_valid  = de_dc_ratio >= MIN_DE_DC_RATIO

        # ---- Pass / fail ----
        passes = (
            PC    <= MAX_PC             and
            de_in <= MAX_EXIT_DIAMETER  and
            fos   >= MIN_FOS            and
            not sep_conservative        and   # Pe/Pa >= SEP_CONSERVATIVE
            eps_cr_valid                and   # eps > CR
            de_dc_valid                       # De/Dc >= MIN_DE_DC_RATIO
        )

        # Failure reason string (for console output)
        reasons = []
        if PC    > MAX_PC:             reasons.append('Pc > max')
        if de_in > MAX_EXIT_DIAMETER:  reasons.append('De > max')
        if fos   < MIN_FOS:            reasons.append('FoS < min')
        if sep_conservative:           reasons.append(f'Pe/Pa={pe_pa_ratio:.3f} < {SEP_CONSERVATIVE}')
        if not eps_cr_valid:           reasons.append(f'eps={eps:.2f} < CR={CONTRACTION_RATIO}')
        if not de_dc_valid:            reasons.append(f'De/Dc={de_dc_ratio:.3f} < {MIN_DE_DC_RATIO}')

        results.append({
            'nozzle':            nozzle_name,
            'nozzle_label':      cfg['label'],
            'nozzle_color':      cfg['color'],
            'nozzle_ls':         cfg['ls'],
            'eta_div':           eta_div,
            'eta_cf':            eta_cf,
            'eps':               eps,
            'eps_label':         eps_label,
            # Performance
            'Isp_ideal':         isp_ideal,
            'Isp':               isp_eff,
            'Cf_ideal':          cf_ideal,
            'Cf':                cf_eff,
            'cstar_ideal':       cstar_ideal,
            'cstar':             cstar_eff,
            # Geometry
            'At':                at_sq_in,
            'Ae':                ae_sq_in,
            'Ac':                ac_sq_in,
            'Dt':                dt_in,
            'De':                de_in,
            'Dc':                dc_in,
            'de_dc_ratio':       de_dc_ratio,
            'Vc':                vc_in3,
            'Lc':                lc_in,
            # Mass flows
            'mdot_total':        mdot_total,
            'mdot_ox':           mdot_ox,
            'mdot_fuel':         mdot_fuel,
            # Thermodynamics
            'Tc':                tc,  'Tt': tt,  'Te': te,
            'gamma_c':           gamma_c, 'gamma_t': gamma_t, 'gamma_e': gamma_e,
            'mw_c':              mw_c,   'mw_t':  mw_t,  'mw_e': mw_e,
            'pe':                pe,
            'pe_pa':             pe_pa_ratio,
            # Thermal
            'bartz_proxy':       bartz_proxy,
            # Structural
            'FoS':               fos,
            # Separation flags
            'sep_summerfield':   sep_summerfield,
            'sep_schmucker':     sep_schmucker,
            'sep_conservative':  sep_conservative,
            # Geometric validity
            'eps_cr_valid':      eps_cr_valid,
            'de_dc_valid':       de_dc_valid,
            # Result
            'passes':            passes,
            'fail_reasons':      '; '.join(reasons) if reasons else 'none',
        })

print(f"Completed {len(results)} calculations")
df      = pd.DataFrame(results)
df_pass = df[df['passes']]
df_fail = df[~df['passes']]
print(f"  {len(df_pass):>3} configurations PASS all constraints")
print(f"  {len(df_fail):>3} configurations FAIL at least one constraint")

# ==================== SUMMARY TABLE ====================
print("\n" + "=" * 130)
print("PASSING CONFIGURATIONS — RANKED BY ISP")
print(f"  Constraints: Pc ≤ {MAX_PC} | De ≤ {MAX_EXIT_DIAMETER}\" | FoS ≥ {MIN_FOS} | "
      f"Pe/Pa ≥ {SEP_CONSERVATIVE} | eps > CR={CONTRACTION_RATIO} | De/Dc ≥ {MIN_DE_DC_RATIO}")
print("=" * 130)
if df_pass.empty:
    print("  *** No configurations pass all constraints ***")
else:
    hdr = (f"{'Nozzle':>12} | {'eps':>6} | {'Isp_CEA':>8} | {'Isp_del':>8} | "
           f"{'Cf_CEA':>7} | {'Cf_eff':>7} | {'Dt(in)':>7} | {'De(in)':>7} | "
           f"{'De/Dc':>6} | {'Pe/Pa':>6} | {'FoS':>5} | {'η_div':>6}")
    print(hdr)
    print("-" * len(hdr))
    for _, r in df_pass.nlargest(min(20, len(df_pass)), 'Isp').iterrows():
        print(
            f"{r['nozzle_label']:>12} | {r['eps']:6.2f} | {r['Isp_ideal']:8.2f} | "
            f"{r['Isp']:8.2f} | {r['Cf_ideal']:7.4f} | {r['Cf']:7.4f} | "
            f"{r['Dt']:7.3f} | {r['De']:7.3f} | {r['de_dc_ratio']:6.3f} | "
            f"{r['pe_pa']:6.3f} | {r['FoS']:5.2f} | {r['eta_div']:6.4f}"
        )
    print("-" * len(hdr))

print("\n" + "=" * 130)
print("FAILING CONFIGURATIONS — REASON SUMMARY")
print("=" * 130)
if not df_fail.empty:
    for _, r in df_fail.sort_values(['nozzle', 'eps']).iterrows():
        print(f"  {r['nozzle_label']:>12}  eps={r['eps']:5.2f}  →  {r['fail_reasons']}")

# ==================== PLOTTING HELPERS ====================
eps_numeric_vals = sorted([e for e in EPS_RANGE if e != 'optimal'])
x_min = min(eps_numeric_vals) - 0.3
x_max = max(eps_numeric_vals) + 0.3

def get_series(nozzle_key, col, numeric_only=True):
    """Return sorted sub-DataFrame for a nozzle type."""
    mask = df['nozzle'] == nozzle_key
    if numeric_only:
        mask &= (df['eps_label'] != 'optimal')
    return df[mask].sort_values('eps')

def get_optimal(nozzle_key, col):
    """Return (eps, value, passes) for the optimal expansion point."""
    row = df[(df['nozzle'] == nozzle_key) & (df['eps_label'] == 'optimal')]
    if row.empty:
        return None, None, None
    return row['eps'].values[0], row[col].values[0], row['passes'].values[0]

def draw_lines(ax, col, ylabel, title,
               hline=None, hline_label=None, hline_color='red',
               extra_hlines=None,          # list of (y, label, color, ls)
               shade_fail_below=None,
               normalise_by=None):
    """
    Draw one line per nozzle type.
    Pass markers = filled circles; fail markers = ✗; optimal point = ★.
    """
    for nozzle_key in nozzle_names:
        cfg = NOZZLE_CONFIGS[nozzle_key]
        sub = get_series(nozzle_key, col)
        p   = sub[sub['passes']]
        f   = sub[~sub['passes']]

        y_all = sub[col] / normalise_by if normalise_by else sub[col]
        y_p   = p[col]   / normalise_by if normalise_by else p[col]
        y_f   = f[col]   / normalise_by if normalise_by else f[col]

        ax.plot(sub['eps'], y_all,
                color=cfg['color'], ls=cfg['ls'], lw=2, alpha=0.55, zorder=2)
        if not p.empty:
            ax.plot(p['eps'], y_p, 'o',
                    color=cfg['color'], ms=7, zorder=4,
                    label=cfg['label'])
        if not f.empty:
            ax.plot(f['eps'], y_f, 'x',
                    color=cfg['color'], ms=9, mew=2.2, alpha=0.45, zorder=4)

        ox, oy_raw, op = get_optimal(nozzle_key, col)
        if ox is not None:
            oy = oy_raw / normalise_by if normalise_by else oy_raw
            mk = '*' if op else 'P'
            ax.plot(ox, oy, mk,
                    color=cfg['color'], ms=14,
                    markeredgecolor='black', mew=0.6, zorder=5)

    if shade_fail_below is not None:
        ax.fill_between([x_min, x_max], 0, shade_fail_below,
                        alpha=0.08, color='red', zorder=0)

    if hline is not None:
        ax.axhline(hline, color=hline_color, ls='--', lw=2.0,
                   label=hline_label, zorder=3)

    if extra_hlines:
        for (yv, lbl, clr, lst) in extra_hlines:
            ax.axhline(yv, color=clr, ls=lst, lw=1.5, label=lbl, zorder=3)

    ax.set_xlim(x_min, x_max)
    ax.set_xlabel('Expansion Ratio  εₑ = Aₑ / Aₜ', fontsize=8.5)
    ax.set_ylabel(ylabel, fontsize=8.5)
    ax.set_title(title, fontsize=9.5, fontweight='bold', pad=4)
    ax.legend(fontsize=7, loc='best', framealpha=0.85)
    ax.grid(alpha=0.25)

# ==================== FIGURE ====================
fig = plt.figure(figsize=(24, 17))
fig.suptitle(
    'LOX / RP-1  —  Nozzle Configuration Trade Study\n'
    f'Fixed Design Point:  Thrust = {THRUST:.0f} lbf  ·  '
    f'Pc = {PC:.0f} psia  ·  O/F = {OF:.1f}  ·  '
    f'Boulder, CO  ({AMBIENT_PRESSURE:.2f} psia)\n'
    f'Constraints:  '
    f'Dₑ ≤ {MAX_EXIT_DIAMETER} in  ·  '
    f'FoS ≥ {MIN_FOS}  ·  '
    f'Pₑ/Pₐ ≥ {SEP_CONSERVATIVE} (conservative)  ·  '
    f'ε > CR = {CONTRACTION_RATIO:.1f}  ·  '
    f'Dₑ/Dc ≥ {MIN_DE_DC_RATIO}\n'
    r'$\eta_{c^*}$' + f' = {ETA_CSTAR}  ·  '
    r'$\eta_{friction}$' + f' = {ETA_CF_FRICTION}  ·  '
    r'$\eta_{CF}$' + ' = η_friction × η_div per nozzle type  ·  '
    '★ = optimal expansion  ·  ✗ = failing case',
    fontsize=11, fontweight='bold'
)

# --- Subplot 1: Delivered Isp vs eps ---
ax1 = fig.add_subplot(3, 3, 1)
draw_lines(ax1, 'Isp',
           'Delivered Isp  (s)',
           'Delivered Isp vs Expansion Ratio')

# --- Subplot 2: Effective Cf vs eps ---
ax2 = fig.add_subplot(3, 3, 2)
draw_lines(ax2, 'Cf',
           'Effective Thrust Coefficient  Cf_eff',
           f'Effective Cf vs Expansion Ratio\n'
           f'(η_friction = {ETA_CF_FRICTION} × η_div × Cf_CEA)')

# --- Subplot 3: Flow Separation Margin ---
ax3 = fig.add_subplot(3, 3, 3)
for nozzle_key in nozzle_names:
    cfg = NOZZLE_CONFIGS[nozzle_key]
    sub = get_series(nozzle_key, 'pe_pa')
    p   = sub[sub['passes']]
    f   = sub[~sub['passes']]
    ax3.plot(sub['eps'], sub['pe_pa'],
             color=cfg['color'], ls=cfg['ls'], lw=2, alpha=0.55, zorder=2)
    if not p.empty:
        ax3.plot(p['eps'], p['pe_pa'], 'o',
                 color=cfg['color'], ms=7, zorder=4, label=cfg['label'])
    if not f.empty:
        ax3.plot(f['eps'], f['pe_pa'], 'x',
                 color=cfg['color'], ms=9, mew=2.2, alpha=0.45, zorder=4)
    ox, oy, op = get_optimal(nozzle_key, 'pe_pa')
    if ox is not None:
        ax3.plot(ox, oy, '*' if op else 'P',
                 color=cfg['color'], ms=14,
                 markeredgecolor='black', mew=0.6, zorder=5)

ax3.fill_between([x_min, x_max], 0, SEP_CONSERVATIVE,
                 alpha=0.10, color='red', zorder=0)
ax3.axhline(SEP_CONSERVATIVE, color='red',    ls='--', lw=2.0,
            label=f'Conservative limit {SEP_CONSERVATIVE}  ← FAIL', zorder=3)
ax3.axhline(SEP_SCHMUCKER,    color='orange', ls=':',  lw=1.6,
            label=f'Schmucker  {SEP_SCHMUCKER}', zorder=3)
ax3.axhline(SEP_SUMMERFIELD,  color='gold',   ls=':',  lw=1.6,
            label=f'Summerfield  {SEP_SUMMERFIELD}', zorder=3)
ax3.set_xlim(x_min, x_max)
ax3.set_xlabel('Expansion Ratio  εₑ = Aₑ / Aₜ', fontsize=8.5)
ax3.set_ylabel('Exit Pressure Ratio  Pₑ / Pₐ', fontsize=8.5)
ax3.set_title('Flow Separation Margin\n'
              '(lower Pₑ/Pₐ  →  greater separation risk)',
              fontsize=9.5, fontweight='bold', pad=4)
ax3.legend(fontsize=7, loc='upper right', framealpha=0.85)
ax3.grid(alpha=0.25)

# --- Subplot 4: Exit Diameter vs eps ---
ax4 = fig.add_subplot(3, 3, 4)
draw_lines(ax4, 'De',
           'Exit Diameter  Dₑ  (in)',
           'Exit Diameter vs Expansion Ratio',
           hline=MAX_EXIT_DIAMETER,
           hline_label=f'Max Dₑ = {MAX_EXIT_DIAMETER} in',
           hline_color='red')

# --- Subplot 5: De/Dc geometric validity ---
ax5 = fig.add_subplot(3, 3, 5)
draw_lines(ax5, 'de_dc_ratio',
           'Dₑ / Dc  (exit / chamber diameter)',
           f'Geometric Validity  Dₑ/Dc\n'
           f'(CR = {CONTRACTION_RATIO:.1f}, '
           f'must be ≥ {MIN_DE_DC_RATIO})',
           hline=MIN_DE_DC_RATIO,
           hline_label=f'Min Dₑ/Dc = {MIN_DE_DC_RATIO}',
           hline_color='red',
           shade_fail_below=MIN_DE_DC_RATIO)

# --- Subplot 6: Bartz throat heat flux proxy (normalised) ---
ax6 = fig.add_subplot(3, 3, 6)
# Normalise to the conical nozzle value at the first numeric eps
bartz_ref_row = df[
    (df['nozzle'] == 'conical') & (df['eps'] == min(eps_numeric_vals))
]
bartz_ref = bartz_ref_row['bartz_proxy'].values[0] if not bartz_ref_row.empty else 1.0

draw_lines(ax6, 'bartz_proxy',
           'Normalised Throat Heat Flux Proxy',
           'Bartz Throat Heat Flux Proxy vs Expansion Ratio\n'
           r'$\propto (P_c/c^*_{eff})^{0.8} \cdot T_c^{0.9} / D_t^{0.2}$'
           '  (normalised to conical @ min eps)',
           normalise_by=bartz_ref)

# --- Subplot 7: Chamber wall FoS ---
ax7 = fig.add_subplot(3, 3, 7)
draw_lines(ax7, 'FoS',
           'Factor of Safety  (hoop)',
           f'Chamber Wall FoS vs Expansion Ratio\n'
           f'(Pc = {PC:.0f} psia, t = {WALL_THICKNESS}", '
           f'Sy = {MATERIAL_YIELD:,} psi)',
           hline=MIN_FOS,
           hline_label=f'Min FoS = {MIN_FOS}',
           hline_color='red')

# --- Subplot 8: Isp breakdown bar chart at optimal eps ---
ax8 = fig.add_subplot(3, 3, 8)
x_pos = np.arange(len(nozzle_names))
bw    = 0.30

isp_cea_vals  = []
isp_del_vals  = []
bar_colors    = []
for n in nozzle_names:
    row = df[(df['nozzle'] == n) & (df['eps_label'] == 'optimal')]
    isp_cea_vals.append(row['Isp_ideal'].values[0])
    isp_del_vals.append(row['Isp'].values[0])
    bar_colors.append(NOZZLE_CONFIGS[n]['color'])

ax8.bar(x_pos - bw / 2, isp_cea_vals, bw,
        label='CEA Ideal Isp',
        color=bar_colors, alpha=0.30, edgecolor='black', lw=0.8)
ax8.bar(x_pos + bw / 2, isp_del_vals, bw,
        label='Delivered Isp',
        color=bar_colors, alpha=0.90, edgecolor='black', lw=0.8)

# Annotate the efficiency loss on each bar
for i, n in enumerate(nozzle_names):
    delta  = isp_del_vals[i] - isp_cea_vals[i]
    eta_cf = ETA_CF_FRICTION * NOZZLE_CONFIGS[n]['eta_div']
    net    = ETA_CSTAR * eta_cf
    ax8.text(x_pos[i] + bw / 2, isp_del_vals[i] + 0.5,
             f'{delta:+.1f} s\n(η={net:.4f})',
             ha='center', va='bottom', fontsize=6.5, color='darkred')

ax8.set_xticks(x_pos)
ax8.set_xticklabels([NOZZLE_CONFIGS[n]['label'] for n in nozzle_names],
                    fontsize=8, rotation=18, ha='right')
ax8.set_ylabel('Specific Impulse  (s)', fontsize=8.5)
ax8.set_title(f'Ideal vs Delivered Isp at Optimal ε\n'
              f'η_c* = {ETA_CSTAR}  ·  η_div per nozzle  ·  '
              f'η_friction = {ETA_CF_FRICTION}',
              fontsize=9.5, fontweight='bold', pad=4)
ax8.legend(fontsize=8)
ax8.grid(alpha=0.25, axis='y')

# Nozzle type eta_div annotation
for i, n in enumerate(nozzle_names):
    ax8.text(x_pos[i] - bw / 2, isp_cea_vals[i] - 1.5,
             f"η_div\n{NOZZLE_CONFIGS[n]['eta_div']:.4f}",
             ha='center', va='top', fontsize=6, color='navy')

# --- Subplot 9: Pass / Fail heatmap ---
ax9 = fig.add_subplot(3, 3, 9)

eps_num_sorted = sorted([e for e in EPS_RANGE if e != 'optimal'])
eps_all_order  = eps_num_sorted + ['optimal']
x_tick_labels  = [f'{e:.1f}' if e != 'optimal' else 'opt'
                  for e in eps_all_order]

# Map eps_setting → eps_label as stored in df
def to_label(e):
    return 'optimal' if e == 'optimal' else f'{float(e):.1f}'

pass_mat = np.full((len(nozzle_names), len(eps_all_order)), np.nan)
for i, nozzle_key in enumerate(nozzle_names):
    for j, ev in enumerate(eps_all_order):
        lbl = to_label(ev)
        row = df[(df['nozzle'] == nozzle_key) & (df['eps_label'] == lbl)]
        if not row.empty:
            pass_mat[i, j] = 1.0 if row['passes'].values[0] else 0.0

im9 = ax9.imshow(pass_mat, cmap='RdYlGn', aspect='auto',
                 vmin=0, vmax=1, interpolation='nearest')

ax9.set_xticks(range(len(x_tick_labels)))
ax9.set_xticklabels(x_tick_labels, fontsize=7, rotation=45, ha='right')
ax9.set_yticks(range(len(nozzle_names)))
ax9.set_yticklabels([NOZZLE_CONFIGS[n]['label'] for n in nozzle_names],
                    fontsize=8)
ax9.set_xlabel('Expansion Ratio', fontsize=8.5)
ax9.set_title('Pass / Fail Map\n'
              '(green ✓ = all constraints met  ·  red ✗ = fail)',
              fontsize=9.5, fontweight='bold', pad=4)

# Annotate each cell
for i in range(len(nozzle_names)):
    for j in range(len(eps_all_order)):
        if not np.isnan(pass_mat[i, j]):
            sym = '✓' if pass_mat[i, j] == 1.0 else '✗'
            ax9.text(j, i, sym, ha='center', va='center',
                     fontsize=9, fontweight='bold', color='black')

# Add a thin separator before the 'optimal' column
ax9.axvline(len(eps_num_sorted) - 0.5, color='white', lw=2)

# ==================== LEGEND ANNOTATIONS ====================
# Shared marker legend below all subplots
legend_elements = [
    mpatches.Patch(facecolor='grey', alpha=0.8,
                   label='Filled circle (●) = passes all constraints'),
    mpatches.Patch(facecolor='grey', alpha=0.3,
                   label='✗ marker = fails ≥ 1 constraint'),
    mpatches.Patch(facecolor='gold', edgecolor='black',
                   label='★ = optimal expansion point (ambient-matched)'),
]
fig.legend(handles=legend_elements,
           loc='lower center', ncol=3, fontsize=8.5,
           framealpha=0.9, bbox_to_anchor=(0.5, 0.005))

plt.tight_layout(rect=[0, 0.04, 1, 0.92])
plt.savefig('rocket_nozzle_trade_study.png', dpi=300, bbox_inches='tight')
print("\n✓ Figure saved: rocket_nozzle_trade_study.png")

# ==================== SAVE DATA ====================
df.to_csv('rocket_nozzle_trade_study_results.csv', index=False)
print("✓ Data saved:   rocket_nozzle_trade_study_results.csv")

print("\n" + "=" * 70)
print("ANALYSIS COMPLETE")
print(f"  Output: {os.getcwd()}")
print("  rocket_nozzle_trade_study.png")
print("  rocket_nozzle_trade_study_results.csv")
print("=" * 70)

plt.show()
plt.close(fig)
```

## Preliminary CAD and engine sizing

With chamber and throat dimensions established from the performance math, I built out preliminary CAD to establish rough engine sizing — chamber length, converging/diverging section geometry, and how the regenerative cooling jacket would wrap around the chamber wall.

**Working with RPA contour data.** Nozzle and chamber contour data was generated in RPA (a rocket propulsion analysis tool) and exported as DXF files. I imported these DXF contours directly into CAD as reference geometry, which let me build the chamber and nozzle profile around a validated aerodynamic contour instead of approximating it by hand.

<!--
  <AstroImage src="/images/regen/dxf-contour-import.png" alt="DXF contour imported into CAD" figNo="02" caption="RPA-GENERATED NOZZLE CONTOUR, IMPORTED AS DXF REFERENCE GEOMETRY" />
-->

## Injector design

The injector plate for this engine is an unlike-doublet impinging design, additively manufactured, with an integrated ASI (augmented spark igniter) and pressure sensor mounts.

**Math first.** Before modeling anything, I worked through the impingement geometry math — orifice sizing, doublet impingement angle, and momentum ratio between the fuel and oxidizer streams — to get atomization and mixing characteristics that matched the mass flow rates coming out of the chamber sizing work.

**Then CAD — a lot of it.** Getting from that math to an actual 3D model took many iterations. Early passes focused just on getting flow paths and manifolds to fit within the envelope; later passes folded in manufacturability and structural constraints as they came up.

- Designed a stacked distribution ring and manifold on the oxidizer side to feed the doublet orifices evenly.
- Used a gothic-arch geometry on the fuel side to maximize usable space for preheated kerosene routing into the regenerative cooling channels.

<!--
  <AstroImage src="/images/regen/injector-cad-iterations.png" alt="Injector CAD iteration history" figNo="03" caption="INJECTOR PLATE — CAD ITERATION HISTORY, V1 THROUGH CURRENT" />
-->

### Topological optimization

Once the injector's flow geometry was locked in, I ran it through topological optimization to address manufacturability and mass:

- Optimized the plate's structure for 3D printability — removing material that wasn't load-bearing while keeping the part buildable without excessive support structure.
- Balanced mass reduction against the structural loads driven by the combustion chamber environment (pressure, thermal gradients at the injector face).
- Iterated between the optimized topology and the manufacturing constraints of the printer, since a mathematically optimal shape isn't useful if it can't actually be printed reliably.

<!--
  <AstroImage src="/images/regen/topology-optimization.png" alt="Topology optimization result on injector plate" figNo="04" caption="INJECTOR PLATE — TOPOLOGY-OPTIMIZED MASS DISTRIBUTION" />
-->

## Cooling analysis

Performed preliminary heat transfer analysis for regenerative and film cooling strategies, estimating thermal loads through the chamber wall and evaluating how effectively the preheated kerosene jacket would manage them.

## Status

In progress — currently finalizing the injector plate design and refining the cooling channel geometry ahead of manufacturing.
