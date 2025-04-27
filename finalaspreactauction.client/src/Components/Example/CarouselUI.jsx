import Emp from "../Emp"

const Carousel = () => {
    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-2 py-8 sm:px-6 lg:px-8"> {/*max-w-screen-xs*/}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-center md:gap-8">
                    <div className="md:col-span-1">
                        <div className="max-w-lg md:max-w -none">
                            <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                                Discover Top Cars at the Ultimate Online Car Auction Platform                            </h2>
                            <p className="mt-4 text-gray-700">
                                Discover unbeatable deals on top-quality cars.
                                Join live auctions and drive away with your dream vehicle at the right price.
                                From premium sedans to high-performance SUVs, bid smart. Drive Smarter Today.
                            </p>
                        </div>
                    </div>
                    <div className="md:col-span-3">
                        <Emp />
                    </div>
                </div>
            </div>
        </section>)
}

export default Carousel