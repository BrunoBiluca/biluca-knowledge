---
tags:
  - segurança
---
> [!info] Definição
> A segurança garante o sigilo, a integridade e a disponibilidade dos dados da organização e dos ativos e infraestrutura de informações. Essa função é geralmente chamada de segurança da informação ou segurança cibernética nas organizações.

Há também o aspecto de **conformidade** que garante cumprir os requisitos normativos em todas as funções da organização. O papel de conformidade pode ou não se desempenhado pelo tipo de segurança.

### Considerações sobre segurança

> [!info] Documentação
> - [Perspectiva da AWS sobre segurança de aplicações focadas em IA](https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/security-perspective-compliance-and-assurance-of-aiml-systems.html#threat-detection)

As principais considerações sobre segurança caem sobre os seguintes aspectos:

- Detecção de ameaças
- Gerenciamento de vulnerabilidade
- Proteção de infraestrutura
- Injeção de prompt
- Criptografia de dados

# Defesa detalhada

A defesa detalhada é um paradigma de construção de várias camadas de defesa redundantes que são utilizadas para proteger contas, workloads, dados e ativos.

Camadas

1. **Proteção de dados**
2. **Gerenciamento de identidade e acesso**
3. **Proteção de aplicações**
4. **Proteção de rede e borda**
5. **Proteção de infraestrutura**
6. **Detecção de ameaças e resposta a incidentes**
7. **Políticas, procedimentos e conscientização**

# Exemplo de política de segurança

Esse é um exemplo de política de segurança aplicado a uma organização.

### Protect Your Credentials

Protect your credentials at all costs. Here are some ground rules for credentials:
- Use a single-sign-on (SSO) for everything. Avoid passwords whenever possible, and use SSO as the default.
- Use multifactor authentication with SSO.
- Don’t share passwords or credentials. This includes client passwords and credentials. If in doubt, see the person you report to. If that person is in doubt, keep digging until you find an answer.
- Beware of phishing and scam calls. Don’t ever give your passwords out. (Again, prioritize SSO.)
- Disable or delete old credentials. Preferably the latter.
- Don’t put your credentials in code. Handle secrets as configuration and never commit them to version control. Use a secrets manager where possible.
- Always exercise the principle of least privilege. Never give more access than is required to do the job. This applies to all credentials and privileges in the cloud and on premises.

### Protect Your Devices

Use device management for all devices used by employees. If an employee leaves the company or your device gets lost, the device can be remotely wiped.
- Use multifactor authentication for all devices.
- Sign in to your device using your company email credentials.
- All policies covering credentials and behavior apply to your device(s).
- Treat your device as an extension of yourself. Don’t let your assigned device(s) out of your sight.
- When screen sharing, be aware of exactly what you’re sharing to protect sensitive information and communications. Share only single documents, browser tabs, or windows, and avoid sharing your full desktop. Share only what’s required to convey your point.
- Use “do not disturb” mode when on video calls; this prevents messages from appearing during calls or recordings.

### Software Update Policy

- Restart your web browser when you see an update alert.
- Run minor OS updates on company and personal devices.
- The company will identify critical major OS updates and provide guidance.
- Don’t use the beta version of an OS.
- Wait a week or two for new major OS version releases.