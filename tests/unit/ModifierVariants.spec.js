import {shallowMount} from "@vue/test-utils";
import ModifierVariants from "@/components/Menu/Modifiers/ModifierVariants";

describe('ModifierVariants', () => {
    const createWrapper = () => {
        return shallowMount(ModifierVariants, {
            propsData: {
                value: ["Черничный"],
                variants: ["Кленовый", "Черничный", "Малиновый"]
            }
        });
    };

    it('Shows list of variants. Selected variants are highlighted.', () => {
        const wrapper = createWrapper();
        const btn1 = `<button class="secondary">Кленовый</button>`;
        const btn2 = `<button class="selected">Черничный</button>`;
        const btn3 = `<button class="secondary">Малиновый</button>`;

        expect(wrapper.html()).toContain(btn1);
        expect(wrapper.html()).toContain(btn2);
        expect(wrapper.html()).toContain(btn3);
    })
    it('When variant is toggled emits input event with new lists of variants', () => {
        const wrapper = createWrapper();
        const button = wrapper.find('button');

        button.trigger('click');

        expect(wrapper.emitted()['input'][0][0]).toEqual(['Черничный', 'Кленовый']);
    })
})