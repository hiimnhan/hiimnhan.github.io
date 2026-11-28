---
title: Research
---

## Truthful Verified Credit: Rewarding Verified Value, Not Reliance, Among Learning Agents

Nhan Nguyen  
*Preprint, 2026*

[PDF](papers/tvc.pdf) · [Code](https://github.com/hiimnhan/tvc)

> [!abstract]- Abstract
> We study how to credit each self-interested agent for its own contribution to a shared return in a way that incentivises truthful reports and maximises social welfare. Credit that rewards agents for being relied on rewards attention, not accuracy, and learning agents respond by exaggerating. We propose Truthful Verified Credit (TVC), which rewards only verified value, adds a bonus for every checked claim, and fines audited false claims, and can supplement an existing credit mechanism. In one round, for a selfish sender, reporting the truth beats every report that fails verification and beats silence, whatever the receivers do with the claim, provided the audit rate and the fine are large enough; over many rounds this holds while the receivers' influence on the sender's future stays below the one-round margin. In a multi-agent bandit, TVC cuts exaggeration from over 90% of reports to below 1% at welfare comparable to popularity credit. On the POGEMA multi-robot pathfinding benchmark, it cuts the lie rate of self-interested learners from 99% to 0.2% and, against hand-set receivers, triples lifelong throughput; when the receivers learn too, lying disappears but throughput does not rise.

## Emergent Behavioural Signalling in Cooperative Multi-Agent Highway Driving

Nhan Nguyen  
*Master thesis, Lancaster University*

[PDF](papers/emergent-behavioural-signalling-in-cooperative-multi-agent-highway-driving.pdf) · [Code](https://github.com/hiimnhan/signal-av)

> [!abstract]- Abstract
> Autonomous highway driving is a multi-agent coordination problem in which every vehicle carries a private behavioural type that others cannot observe directly. This thesis formulates cooperative multi-agent highway driving as a repeated signalling game over a small discrete vocabulary of behaviourally grounded tokens whose meanings are not pre-assigned. It then asks whether communication emerges among the agents at all, and in what sense. The agents are trained using multi-agent reinforcement learning and the signalling channel is probed with evaluation-time interventions that separately disturb the token, the neighbour kinematics, and their binding. Communication does emerge, not in the form standard information metrics are designed to register, but through what we call convention-of-use. The token carries almost no information about a driver's hidden type. Nevertheless, corrupting the binding between token and behaviour raises the collision rate by 65 to 86%, depending on how the binding is broken. In this experiment, the active interventions revealed a dependence on the channel that the passive metrics did not register. This suggests that evaluations of emergent communication, and audits of connected-driving systems, should test the binding between message and behaviour directly rather than rely on measured informativeness alone.

## Werewolf - How to be a Better Villager

Chew Jin Cheng, Duong Minh Hoang, Hoang Phuong Nam, Nhan Nguyen, Vuong Thanh Cong (alphabetical order)  
*Coursework*

[PDF](papers/werewolf.pdf) · [Code](https://github.com/hiimnhan/scc452-badass-werewolf)

> [!abstract]- Abstract
> This study investigates whether smaller language models (SLMs) can improve their performance when guided by larger language model (LLMs) in a multi-agent game. As the current research on how SLMs perform when supported by LLMs is limited, the study focuses on integrating a Coach-Player framework into the Werewolf game. In this study, villager agents are supported by a coach to play against the wolf agents to evaluate the impact of guidance on game performance. The results indicate that while the models with lower capability show no improvement, using coaching improves the performance for higher ones by increasing win rate from 55% to 74%. These findings suggest that as long as the model is able to interpret and apply the guidance, coaching can improve its performance.
