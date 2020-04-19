import FreeDeliveryInformer from "@/components/Checkout/FreeDeliveryInformer";
import {shallowMount} from "@vue/test-utils";

const factory = (propsData) => {
    return shallowMount(FreeDeliveryInformer, {
        propsData: {...propsData}
    });
};

describe('FreeDeliveryInformer', () => {
    it('Shows 180 sum with delivery and 300 to free delivery if sum is 100', () => {
        const wrapper = factory({total: 100});

        expect(wrapper.find('.total-with-delivery').text()).toBe("180 р.");
        expect(wrapper.find('.need-for-free-delivery').text()).toBe("300 р.");
    });

    it('Shows 460 sum with delivery and 20 to free delivery if sum is 380.', () => {
        const wrapper = factory({total: 382});

        expect(wrapper.find('.total-with-delivery').text()).toBe("462 р.");
        expect(wrapper.find('.need-for-free-delivery').text()).toBe("18 р.");
    })

    it('Shows free delivery notice if sum is 401.', () => {
        const wrapper = factory({total: 401});

        expect(wrapper.find('.free-delivery-notice').text()).toBe('Доставка бесплатно! )');
    })
});