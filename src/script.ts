let form = document.querySelector('form') as HTMLFormElement;
let inputs = document.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
let botao = document.querySelector('.botao-cadastrar') as HTMLButtonElement;

interface Validador {

    lidarComEnvio: (e: Event) => void,
    checarInput: (input: HTMLInputElement) => boolean | string
    mostrarErro: (input: HTMLInputElement, mensagem: string | boolean) => void,
    fecharErro: () => void

}



let validador: Validador = {

    lidarComEnvio: (e: Event): void => {
        
        e.preventDefault();

        validador.fecharErro();

        let enviar: boolean = true;

        for (let i = 0; i < inputs.length; i++) {

            let input: HTMLInputElement = inputs[i];

            let checar: string | boolean = validador.checarInput(input);

            if (checar !== true) {
                enviar = false;
                validador.mostrarErro(input, checar);
            }


        }

        if (enviar) {
            form.submit();
        }



    },
    checarInput: (input: HTMLInputElement): string | boolean => {

        let rules: string | string[] | null = input.getAttribute('data-rules');

        if (rules !== null && typeof rules === 'string') {

            rules = rules.split('|');

            for (let k in rules) {

                let rDetalhes: string[] = rules[k].split('=');

                switch (rDetalhes[0]) {

                    case 'required':

                        if (input.value === '') {

                            return 'Campo obrigatório';

                        }

                    break;
                    case 'min':

                        if (input.value.length < parseInt(rDetalhes[1])) {

                            return 'Campo deve ter no mínimo ' + rDetalhes[1] + ' caracteres';

                        }

                    break;
                    case 'email':

                        if (input.value !== '') {

                            let regex = /([a-z0-9]{2,})?\.?([a-z0-9]{2,})@([a-z0-9]{2,})(\.[a-z]{2,})(\.[a-z]{2,})?/g;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'Email inválido';
                            }

                        }

                    break;
                    case 'telefone': 

                    if(input.value !== '') {

                        let regex = /(\(?[0-9]{2,}\)?)\s?([0-9]{4,5})\-?([0-9]{4})/g;

                        if(!regex.test(input.value)) {
                            return 'Telefone inválido';
                        }

                    }

                    break;

                }

            }

        }

        return true;

    },
    mostrarErro: (input: HTMLInputElement, mensagem: string | boolean): void => {

        if (typeof mensagem === 'string') {

            input.classList.remove('rounded-md');
            input.classList.add('rounded-t-md');


            let erroElement: HTMLDivElement = document.createElement('div');
            erroElement.classList.add('erroComponente');
            erroElement.innerText = mensagem;

            input.after(erroElement);

        }

    },
    fecharErro: (): void => {

        let errosElementos = document.querySelectorAll('.erroComponente') as NodeListOf<HTMLDivElement>;

        for (let i = 0; i < errosElementos.length; i++) {

            errosElementos[i].remove();

        }

    }

}

form.addEventListener('submit', validador.lidarComEnvio);



