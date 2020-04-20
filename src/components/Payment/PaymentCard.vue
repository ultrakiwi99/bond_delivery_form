<template>
    <div>
        <div class="payment-description">
            <p>
                Для оплаты (ввода реквизитов Вашей карты) Вы будете перенаправлены на платёжный шлюз ПАО СБЕРБАНК.
                Соединение с платёжным шлюзом и передача информации осуществляется в защищённом режиме с использованием
                протокола шифрования SSL. В случае если Ваш банк поддерживает технологию безопасного проведения
                интернет-платежей Verified By Visa, MasterCard SecureCode, MIR Accept, J-Secure для проведения платежа
                также
                может потребоваться ввод специального пароля.
            </p>
            <p>
                Настоящий сайт поддерживает 256-битное шифрование. Конфиденциальность сообщаемой персональной информации
                обеспечивается ПАО СБЕРБАНК. Введённая информация не будет предоставлена третьим лицам за исключением
                случаев, предусмотренных законодательством РФ. Проведение платежей по банковским картам осуществляется в
                строгом соответствии с требованиями платёжных систем МИР, Visa Int., MasterCard Europe Sprl, JCB.
            </p>
        </div>
        <button :disabled="!this.registerUrl" @click="goToPayment" class="primary">Оплатить</button>
    </div>
</template>

<script>
    export default {
        name: "PaymentCard",
        beforeMount() {
            this.$sber
                .getRegisterUrl()
                .then(result => result.json())
                .then(json => console.log(json));
        },
        data: () => ({
            registerUrl: null
        }),
        methods: {
            goToPayment() {
                window.location.href = this.registerUrl;
            }
        }
    }
</script>

<style scoped>
    .payment-description {
        padding: 1rem;
        margin: 1rem;
        color: #8795a1;
    }
</style>