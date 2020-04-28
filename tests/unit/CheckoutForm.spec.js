import {createLocalVue, shallowMount} from "@vue/test-utils";
import Vuex from "vuex";
import CheckoutForm from "@/components/Checkout/CheckoutForm";

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
    state: {
        client: {
            name: null,
            address: null,
            phone: null,
            lastStore: null,
            comment: null
        }
    },
    getters: {
        client: state => state.client
    },
    mutations: {
        updateClient: () => {
        }
    }
});

const testName = "Иван Петров";
const testPhone = "89219583150";
const testAddress = "Невский 145 оф. 12";
const testComment = "Тестовый комментарий";

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
        const wrapper = shallowMount(CheckoutForm, {store, localVue});
        const inputs = wrapperInputs(wrapper);

        inputs.change('name', testName);
        inputs.change('address', testAddress);
        inputs.change('phone', testPhone);
        inputs.change('comment', testComment);

        expect(wrapper.vm.$data.client.name).toBe(testName);
        expect(wrapper.vm.$data.client.address).toBe(testAddress);
        expect(wrapper.vm.$data.client.phone).toBe(testPhone);
        expect(wrapper.vm.$data.client.comment).toBe(testComment);

        wrapper.destroy();
    });
});