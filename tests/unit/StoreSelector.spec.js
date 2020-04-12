import {shallowMount} from "@vue/test-utils";
import StoreSelector from "@/components/Store/StoreSelector";

describe('StoreSelector', () => {
    const makeWrapper = (inputStore) => {
        return shallowMount(StoreSelector, {
            propsData: {
                value: inputStore,
                stores: [
                    {
                        name: `м. Черная Речка, Карельский пер., 3Б`,
                        link: `http://www.coffeebon.ru/delivery/img/kb6.jpg`
                    },
                    {
                        name: `м. Финляндский Вокзал, ул. Академика Лебедева, 7`,
                        link: `http://www.coffeebon.ru/delivery/img/kb10.jpg`
                    }
                ]
            }
        });
    }

    it('is visible', () => {
        const wrapper = makeWrapper();
        expect(wrapper.html()).toMatchSnapshot();
    });
    it('sends input event on store selection', () => {
        const wrapper = makeWrapper();
        const select = wrapper.find('#store-select');
        const firstStore = wrapper.vm['stores'][0];

        select.setValue(firstStore.name);
        select.trigger('input');

        expect(wrapper.emitted()['input'][0][0]).toBe(firstStore);
    });
});