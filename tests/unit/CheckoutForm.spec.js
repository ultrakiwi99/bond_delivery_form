import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuex from "vuex";
import CheckoutForm from "@/components/Checkout/CheckoutForm";

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
    state: {
        client: {}
    },
    mutations: {
        updateClient: state => {
        }
    }
});

const testName = "Иван Петров";
const testPhone = "89219583150";
const testAddress = "Невский 145 оф. 12";
const testComment = "Тестовый комментарий";

function wrapperFactory() {
    return shallowMount(CheckoutForm, {store, localVue});
}

function wrapperInputs(wrapper) {
    return {
        name: wrapper.find("#name"),
        address: wrapper.find("#address"),
        phone: wrapper.find("#phone"),
        comment: wrapper.find("#comment"),
        change(name, value) {
            this[name].element.value = value;
            this[name].trigger('input');
        }
    }
}

describe('CheckoutForm.vue', () => {

    it('Позволяет вводить имя, телефон, адрес клиента.', () => {
        const wrapper = wrapperFactory();
        const inputs = wrapperInputs(wrapper);

        inputs.change('name', testName);
        inputs.change('address', testAddress);
        inputs.change('phone', testPhone);
        inputs.change('comment', testComment);

        expect(wrapper.vm.$data.name).toBe(testName);
        expect(wrapper.vm.$data.address).toBe(testAddress);
        expect(wrapper.vm.$data.phone).toBe(testPhone);
        expect(wrapper.vm.$data.comment).toBe(testComment);
    });

    it('Оставляет отключенной кнопку отправить пока не введены имя, адрес и телефон.', () => {
        const wrapper = wrapperFactory();
        const inputs = wrapperInputs(wrapper);
        const submitButton = wrapper.find('#submit')

        expect(submitButton.element['disabled']).toBeTruthy();

        inputs.change('name', testName);
        expect(submitButton.element['disabled']).toBeTruthy();

        inputs.change('address', testName);
        expect(submitButton.element['disabled']).toBeTruthy();

        inputs.change('phone', testPhone);
        expect(submitButton.element['disabled']).toBeTruthy();
    });
});