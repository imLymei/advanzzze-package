![Logo](https://media.discordapp.net/attachments/1095475771771986104/1126577250821742602/Advanzzze-banner.png)

# npx advanzzze

`npx advanzzze` é um comando simples e útil para iniciar projetos utilizando a versão mais recente do `Next.js`, com alguns pacotes de utilidades pré-instalados e configurados.

## Funcionalidades

#### Projetos

- [x] Criar projetos [Next.js](https://nextjs.org) mais recente
  - [x] Suporte Javascript
  - [x] Suporte [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [x] Suporte para criação de aplicativos desktop com [Tauri](https://tauri.app) e Next.js
- [ ] Suporte para criação de aplicativos mobile

#### Utilidades

- [x] Plugin do [Prettier](https://prettier.io/docs/en/index.html) de ordenação de classes para o Tailwind CSS
- [x] Adicionar a função `cn` para melhor aplicação de classes condicionais
  - [Guia para utilização do comando.](#cn)

## Instalação

1. Crie a pasta do seu projeto.

2. Entre na pasta do projeto e use npx `advanzzze`.
3. Escolha seu tipo de projeto e preferências.

4. Siga qualquer instrução adicional.

5. Comece a programar.

## Referências úteis

- Gerais

  - [React](https://legacy.reactjs.org/docs/getting-started.html)
  - [Next.js](https://nextjs.org/docs)
  - [Tailwind CSS](https://tailwindcss.com/docs/installation)

- Desktop
  - [Tauri](https://tauri.app/v1/guides/getting-started/setup/next-js)

## Uso/Exemplos

### cn

`cn` é uma função personalizada que utiliza [clsx](https://www.npmjs.com/package/clsx) e [tailwind-merge](https://www.npmjs.com/package/tailwind-merge) para, respectivamente, criar classes condicionalmente e juntá-las sem conflitos com o Tailwind CSS."

#### Utilização

```javascript
cn('classes padrão', {
	'classes Condicinais': CondicaoUm,
	'classes Condicinais': CondicaoDois,
});
```

#### Exemplo de código

```javascript
import cn from '@/utils/cn';

export default function Card({ bgColor, children }) {
	const isBlue = bgColor === 'blue';
	const isRed = bgColor === 'red';
	const isGreen = bgColor === 'green';

	return (
		<div
			className={cn('p-2 w-52 h-24 border border-black', {
				'bg-blue-500': isBlue,
				'bg-red-500': isRed,
				'bg-green-500': isGreen,
			})}>
			{children}
		</div>
	);
}
```

## Roadmap

- Adicionar mais funções utilitárias.

- Adicionar menu para escolha dos utilitários.

- Adicionar suporte para criação de aplicativos mobile.

## Autores

- [@imLymei](https://github.com/imLymei/)
- [@kevynlopes](https://github.com/kevynlopes)

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
