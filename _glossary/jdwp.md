---
title: "Java Debug Wire Protocol (JDWP)"
slug: "jdwp"
also-known-as: ["JDWP", "Java Debug Wire Protocol", "jdwp agent"]
category: "system-design"
date: 2026-08-17
definition: "JDWP is the wire protocol that carries debugging information and commands between a debugger and a running [JVM](/glossary/jvm/). It is one of the three layers of the Java Platform Debugger Architecture (JPDA), sitting between the low-level JVM TI inside the VM and the high-level Java Debug Interface (JDI) used by IDEs. When you start a JVM with `-agentlib:jdwp=...`, the VM loads a native agent that speaks JDWP over a socket or shared memory, which is what lets tools like IntelliJ, Eclipse, and `jdb` set breakpoints, step through code, and inspect variables, even across a network."
key_takeaways:
  - "JDWP is a protocol, not a tool. It only defines the format of debug requests and events, not how they travel."
  - "It is the middle layer of JPDA: JVM TI (inside the VM) to JDWP (the wire) to JDI (the debugger API)."
  - "You enable it with the JVM flag `-agentlib:jdwp`, which is how both local and remote debugging work."
  - "Because it can expose full control of a JVM, an open JDWP port is a serious security risk and must never be left on in production."
how_it_works:
  - "The debuggee JVM loads a native JDWP agent that talks to the VM through JVM TI."
  - "The agent listens on a transport (dt_socket for TCP, dt_shmem for shared memory) for a debugger to attach."
  - "The debugger sends command packets (set breakpoint, step, read a field) and the agent replies with reply and event packets."
  - "The IDE builds its debugging UI on top of the Java Debug Interface (JDI), which speaks JDWP under the hood."
real_world:
  - "Remote debugging a service in Docker or Kubernetes works by exposing the JDWP port and attaching your IDE to it."
  - "The command-line debugger jdb is a thin JDI client that connects over JDWP."
  - "Leaving JDWP enabled on a public port is a known remote-code-execution vector, so it belongs only in dev and staging."
related_terms: ["jvm", "bytecode", "class-loader", "jit-compilation"]
related_posts:
  - "/how-java-debugging-works/"
  - "/how-jvm-works/"
---
