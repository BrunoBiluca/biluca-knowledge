---
tags:
  - arquitetura_software
---
Nesse capítulo o autor foca em definir um conceito que fica meio flutuante ao código que são os Serviços.

Também apresenta uma discussão de quando é necessário criar esse o serviço e de qual o nível de abstração desse serviço.

# Resumo

Um Serviço no modelo de domínio é quando uma operação performada parece fora do lugar e não pertence nem a uma Agregador nem a um Objeto Valor.

Um Serviço de domínio é utilizado para:
- Processar alguma execução do negócio
- Transformação de um objeto do domínio de uma composição para outra
- Calcular um valor requisitando informações de outro objeto de domínio.

Se você estiver utilizando o princípio de inversão de dependências ou arquitetura Hexagonal, você pode decidir colocar a implementação em uma classe em um local fora do domínio do modelo. A implementação são então persistidas em um módulo na camada de infraestrutura.

Para serviços não é obrigatório a separação da implementação da interface, já que várias vezes a regra de negócio tem uma única forma de implementação.

> [!tip] Interfaces e serviços
> Se a sua classe de concreta tem o nome da interface mais algum sufíxo que a diferencia, isso não é um bom indicador de uma boa nomenclatura. Talvez seja necessário pensar um nome mais demonstrativo da classe ou você não precisa de uma interface separada da implementação.

Se o foco for modularidade focar em colocar as interfaces em pacotes diferentes das implementações pode ser algo bom. Por exemplo, um serviço com a interface `EncryptionService`  é colocado no modelo do domínio, enquanto a implementação `MD5EncryptionService` deve ser colocado na camada de infraestrutura.

### Exemplo relacionado a autenticação

A interface é declarada na camada de domínio, já que define as regras de negócio.

```java
package com.saasovation.identityaccess.domain.model.identity;
public interface AuthenticationService {
	UserDescriptor authenticate(TenantId aTenantId, String aUsername, String aPassword);
}
```

A implementação é definida na camada de infraestrutura, já que irá utilizar as demais implementações de repositórios que são definidas nessa camada.

```java
package com.saasovation.identityaccess.infrastructure.services;
import com.saasovation.identityaccess.domain.model.DomainRegistry;
import com.saasovation.identityaccess.domain.model.identity.AuthenticationService;
import com.saasovation.identityaccess.domain.model.identity.Tenant;
import com.saasovation.identityaccess.domain.model.identity.TenantId;
import com.saasovation.identityaccess.domain.model.identity.User;
import com.saasovation.identityaccess.domain.model.identity.UserDescriptor;

public class DefaultEncryptionAuthenticationService implements AuthenticationService {
	@Override
	public UserDescriptor authenticate(TenantId aTenantId, String aUsername, String aPassword) {
		if (aTenantId == null) {
			throw new IllegalArgumentException("TenantId must not be null.");
		}
		if (aUsername == null) {
			throw new IllegalArgumentException("Username must not be null.");
		}
		if (aPassword == null) {
			throw new IllegalArgumentException("Password must not be null.");
		}
		
		Tenant tenant = DomainRegistry
			.tenantRepository()
			.tenantOfId(aTenantId);
		if (tenant != null && tenant.isActive()) {
			String encryptedPassword = DomainRegistry
				.encryptionService()
				.encryptedValue(aPassword);
			User user = DomainRegistry
				.userRepository()
				.userFromAuthenticCredentials(aTenantId, aUsername, encryptedPassword);
			
			if (user != null && user.isEnabled()) {
				userDescriptor = user.userDescriptor();
			}
		}
		return userDescriptor;
	}
}
```

