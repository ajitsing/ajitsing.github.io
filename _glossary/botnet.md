---
title: "Botnet"
slug: "botnet"
also-known-as: ["Bot Network", "Zombie Army", "Zombie Network"]
category: "security"
date: 2026-07-22
definition: "A botnet is a network of internet-connected devices infected with malware and controlled remotely by an attacker, often without the owners knowing. Each infected machine, called a bot or zombie, follows commands from a command-and-control server. Botnets are the engine behind most large DDoS attacks, spam campaigns, and credential-stuffing, because they let one attacker direct the firepower of thousands or millions of devices at once."
key_takeaways:
  - "A botnet is a fleet of malware-infected devices an attacker controls remotely to act in unison."
  - "Cheap, always-on IoT devices like cameras, routers, and TVs are prime targets because of weak default passwords."
  - "Botnets provide the distributed firepower that turns a simple DoS into a DDoS attack."
  - "You can rent botnet time on underground markets, which is why DDoS-for-hire (booter) services are so common."
how_it_works:
  - "Malware spreads by scanning for devices with known vulnerabilities or default credentials and infects them."
  - "Each infected bot phones home to a command-and-control (C2) server and waits for instructions."
  - "The operator issues a single command, such as flood a target IP, and every bot obeys at once."
  - "Because traffic comes from many legitimate-looking devices worldwide, it is hard to block by source."
real_world:
  - "The Mirai botnet infected IoT devices and launched the 2016 attack that took down DNS provider Dyn."
  - "The Aisuru-Kimwolf botnet, an estimated 1 to 4 million infected devices including Android TVs, drove the record 31.4 Tbps attack Cloudflare mitigated in 2025."
  - "Modern botnets are rented out through DDoS-for-hire services, lowering the skill needed to launch an attack."
related_terms: ["ddos-attack", "rate-limiting", "cdn", "load-balancing"]
related_posts:
  - "/ddos-attack-and-protection/"
  - "/how-cloudflare-supports-55-million-requests-per-second/"
---
