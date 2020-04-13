import {shallowMount} from "@vue/test-utils";
import ModifierVariants from "@/components/Menu/Modifiers/ModifierVariants";

describe('ModifierVariants', () => {
    const createWrapper = () => {
        return shallowMount(ModifierVariants, {
            propsData: {
                value: ["Кленовый", "Черничный"],
                variants: ["Кленовый", "Черничный", "Малиновый"]
            }
        });
    };

    it('Shows list of selected variants.', () => {
        const wrapper = createWrapper();
        const expectedHtml = `<span>Кленовый</span><span>Черничный</span>`;

        expect(wrapper.html()).toContain(expectedHtml);
    });
    it('Add button toggles variants list.', () => {
        const wrapper = createWrapper();
        const addBtn = wrapper.find('.btn-add-variant');

        expect(addBtn.exists()).toBe(true);
        expect(wrapper.vm['variantsAreVisible']).toBe(false);

        addBtn.trigger('click');

        expect(wrapper.vm['variantsAreVisible']).toBe(true);

        addBtn.trigger('click');
        expect(wrapper.vm['variantsAreVisible']).toBe(false);
    })
})