import * as React from "react";
import { View, Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
    CarouselRenderItem,
    ICarouselInstance,
} from "react-native-reanimated-carousel";
import { CarouselRenderItemInfo } from "react-native-reanimated-carousel/lib/typescript/types";

const PAGE_WIDTH = Dimensions.get("screen").width;

function Index({
    renderItem,
    data,
}: {
    renderItem: CarouselRenderItem<any>;
    data: any[];
}) {
    const [isVertical, setIsVertical] = React.useState(false);
    const [autoPlay, setAutoPlay] = React.useState(false);
    const [pagingEnabled, setPagingEnabled] = React.useState<boolean>(true);
    const [snapEnabled, setSnapEnabled] = React.useState<boolean>(true);
    const progress = useSharedValue<number>(0);
    const baseOptions = isVertical
        ? ({
              vertical: true,
              width: PAGE_WIDTH * 0.86,
              height: PAGE_WIDTH * 0.6,
          } as const)
        : ({
              vertical: false,
              width: PAGE_WIDTH,
              height: PAGE_WIDTH * 0.6,
          } as const);

    const ref = React.useRef<ICarouselInstance>(null);

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - progress.value,
            animated: true,
        });
    };

    return (
        <View
            style={{
                alignItems: "center",
            }}
        >
            <Carousel
                ref={ref}
                {...baseOptions}
                style={{
                    width: PAGE_WIDTH,
                }}
                loop
                pagingEnabled={pagingEnabled}
                snapEnabled={snapEnabled}
                autoPlay={autoPlay}
                autoPlayInterval={1500}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
                data={data}
                renderItem={renderItem}
            />
        </View>
    );
}

export default Index;
