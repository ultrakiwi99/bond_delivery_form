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

        const expectedHtml = `<button class="primary">S</button><button class="selected">M</button><button class="primary">L</button>`;

        expect(wrapper.html()).toContain(expectedHtml);
    });
});