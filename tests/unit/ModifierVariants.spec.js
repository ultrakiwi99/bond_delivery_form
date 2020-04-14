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
        const expectedHtml = `<button class="secondary">Кленовый</button><button class="selected">Черничный</button><button class="secondary">Малиновый</button>`

        expect(wrapper.html()).toContain(expectedHtml);
    })
    it('When variant is toggled emits input event with new lists of variants', () => {
        const wrapper = createWrapper();
        const button = wrapper.find('button');

        button.trigger('click');

        expect(wrapper.emitted()['input'][0][0]).toEqual(['Черничный', 'Кленовый']);
    })
})