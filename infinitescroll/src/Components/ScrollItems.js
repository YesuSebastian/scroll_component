import React from "react";
import axios from "axios";

function ScrollItems(props) {
    const INITIAL_PAGE_SIZE = 20;

    const Item = ({ children, reference }) => {
        return <div ref={reference}>{children}</div>;
    };

    const Loader = () => {
        return (
            <div className="w-full md:w-3/5 mx-auto p-4 text-center mb-4">
              <h1>Loading........</h1>
            </div>
        );
    };

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(true);
    const [pages, setPages] = React.useState(1);
    const scrollObserver = React.useRef();

    React.useEffect(() => {
        getItems(pages);
        setPages((pages) => pages + 1);
    }, []);

    const lastItemRef = React.useCallback(
        (node) => {
            if (isLoading) return;
            if (scrollObserver.current) scrollObserver.current.disconnect();

            scrollObserver.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    if (pages < INITIAL_PAGE_SIZE ) {
                        getItems(pages);
                        setPages((pages) => pages + 1);
                    } else {
                        setHasMore(false);
                    }
                }
            });

            if (node) scrollObserver.current.observe(node);
        },
        [isLoading, hasMore]
    );

    const getItems = async (page) => {
        setIsLoading(true);
        //set initial wait
        await new Promise((resolve) => setTimeout(resolve, 1000));

        await axios
            //https://www.reddit.com/r/aww/
            .get(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=20`)
            .then((resp) => {
                setItems([...items, ...resp.data]);
                setIsLoading(false);
            });
    };

    return (
        <>
            <div className="flex justify-center p-4 mb-4">
                <h1 className="text-4xl font-semibold">
                  Infinite Scroll Demo
                </h1>
            </div>
            <div className="flex flex-col">
                {items.map((item, index) =>
                    index + 1 === items.length ? (
                        <Item reference={lastItemRef} key={index}>
                            <div className="w-full md:w-3/5 bg-gray-300 mx-auto p-4 rounded mb-4 flex">
                                <img
                                    src={item.thumbnailUrl}
                                    alt={`Image ${index}`}
                                    className="flex-auto mr-4"
                                    width="150"
                                    height="150"
                                />
                                <div className="flex-auto">
                                    <h2 className="text-2xl font-semibold mb-2">
                                        {item.title}
                                    </h2>
                                    <p className="text-sm">
                                    Donec id faucibus justo. Donec ut tempus augue, non consectetur turpis. Praesent scelerisque tincidunt diam, quis cursus est egestas ut. Sed at nibh placerat ligula varius dictum. Curabitur gravida ipsum sit amet erat ullamcorper, id varius arcu molestie. In pharetra dignissim auctor. Mauris quis magna ante. Vestibulum nec quam mattis, ullamcorper massa ac, imperdiet orci. Nulla eu nunc in ante ultrices hendrerit sit amet sed dui. Suspendisse lacinia leo id dui fringilla, tincidunt sodales ligula posuere. Vivamus lobortis dolor vitae nisi pulvinar cursus. Donec finibus eros nisl, vel dictum ante gravida sed.
                                    </p>
                                </div>
                            </div>
                        </Item>
                    ) : (
                        <Item key={index}>
                            <div className="w-full md:w-3/5 bg-gray-300 mx-auto p-4 rounded mb-4 flex">
                                <img
                                    src={item.thumbnailUrl}
                                    className="flex-auto mr-4"
                                    width="150"
                                    height="150"
                                />
                                <div className="flex-auto">
                                    <h2 className="text-2xl font-semibold mb-2">
                                        {item.title}
                                    </h2>
                                    <p className="text-sm">
                                    Sed non sagittis odio. Cras in efficitur dui, vel accumsan augue. Proin in leo sed ligula rhoncus egestas. Nullam ex dui, egestas eu purus eu, finibus auctor justo. Donec vitae maximus urna. In sodales nulla id eros rutrum, et convallis leo lobortis. Suspendisse et sollicitudin magna, sit amet auctor leo. Maecenas sit amet ipsum pellentesque, semper justo eu, elementum lectus. Vestibulum ac nisl vel purus suscipit congue a nec purus. Cras vel risus ante. Nullam vehicula ligula in dolor elementum auctor. Phasellus quis augue libero. Donec a consectetur ipsum, eget dictum velit. Mauris cursus blandit faucibus. Nunc lobortis a ex sit amet venenatis.
                                    </p>
                                </div>
                            </div>
                        </Item>
                    )
                )}

                {isLoading && <Loader />}
            </div>
        </>
    );
}

export default ScrollItems;
