---
title: "AI and Statistics for Stock Market Prediction"
description: "A research project and prototype on forecasting stock moves from option prices: implied-volatility surfaces, Monte Carlo jump-diffusion paths, and social-media sentiment as a model input."
date: "2025-12-01"
status: "completed"
tags: ["statistics", "Monte Carlo", "Python", "research"]
draft: false
role: "Literature review, research presentation and a Python simulator prototype"
---

## Overview

A semester research project exploring whether artificial intelligence and statistical models can usefully predict stock prices, presented as *An Exploration of Possible Uses of Artificial Intelligence in Predicting the Stock Market*. The core problem is one any engineer recognizes: noisy data, mixed signals, confounding variables, and a model that has to use the past to predict the future.

## Literature review

I narrowed a larger set of sources down to six, covering risk-adjusted portfolio optimization (Monte Carlo simulation and the Black-Litterman model), numerical PDE modeling of options pricing, survey work on AI in market analysis, a hybrid AI forecasting framework, interpretive structural modeling of price drivers, and tail-risk optimization with copula dependence models.

## The simulator

The prototype treats option prices as the market's own forecast:

1. Ingest option quotes and build an implied-volatility surface.
2. Recover a risk-neutral price distribution from it.
3. Simulate stock paths with Monte Carlo under a jump-diffusion model.
4. Report percentile bands, value at risk and expected shortfall.

Social-media sentiment enters as a model input rather than a prediction. Stronger sentiment, either way, raises volatility and the rate of price jumps, and its sign sets the direction of the jumps. The prototype runs as a live Streamlit dashboard: sliders set the base volatility, the sentiment sensitivities and the number of paths, and it plots the median path and the 5–95% band. Sentiment is synthetic for now. The real-data version would stream option chains and sentiment scores and align them in time with no look-ahead.

The simulator code was prototyped with an AI coding assistant.

## Takeaways

Explainability is the hard part: a black-box model can't say how much it weighs social media against company earnings. Real-time data, API limits and noise handling end up mattering as much as the math, and nothing here should be read as a trading signal.
