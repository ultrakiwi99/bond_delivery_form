import {shallowMount} from "@vue/test-utils";
import SizeSelector from "@/components/Size/SizeSelector";

describe('SizeSelector', () => {
    const sizes = [
        {
            short: 'S',
            price: 50
        },
        {
            short: 'M',
            price: 100
        },
        {
            short: 'L',
            price: 150
        }
    ];
    it('shows selected size based on selected', () => {
        const wrapper = shallowMount(SizeSelector, {
            propsData: {
                sizes: sizes,
                selected: {
                    short: 'M',
                    price: 100
                }
            }
        });
        expect(wrapper.html()).toContain('<button class="primary">S')
        expect(wrapper.html()).toContain('<button class="selected">M')
        expect(wrapper.html()).toContain('<button class="primary">L')
        expect(wrapper.html()).toMatchSnapshot();
    });
});