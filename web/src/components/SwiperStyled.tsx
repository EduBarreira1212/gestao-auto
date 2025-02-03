import { Swiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ReactNode } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SwiperStyled = ({ children }: { children: ReactNode }) => {
    return (
        <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            style={
                {
                    '--swiper-navigation-size': '1.75rem',
                    '--swiper-navigation-color': '#00ADB5',
                    '--swiper-pagination-color': '#00ADB5',
                    zIndex: 0,
                } as React.CSSProperties
            }
        >
            {children}
        </Swiper>
    );
};

export default SwiperStyled;
