const FixListSection = () => {
    const items = [
        {
            title: "Screen Repair",
            desc: "Replacing the display screen of an electronic device, such as a smartphone, tablet, laptop or television.",
            img: "https://cdn-lfknj.nitrocdn.com/UUZBlQdfDpPzmOyffyZfJuHAKwqIGBZj/assets/images/optimized/rev-94fd14a/gadgetfixsb.com/v2/wp-content/uploads/2023/12/Repair-LCD-Screen-on-Phone-.jpg",
        },
        {
            title: "Battery Replacement",
            desc: "Over Time batteries can degrade, leading to decreesed perfomarnce reduced battery life, even completed failure.",
            img: "https://univercellcanada.com/wp-content/uploads/2024/08/abd67a90e493ad3087be8b6da1f4f959.jpg",
        },
        {
            title: "Water Damage Repair",
            desc: "It can be particilarly detrimental to electronic components, corrosion short circuits, and other issues.",
            img: "https://www.iphonerepairleeds.com/products/s5-water-damage-mobile.jpg",
        },
        {
            title: "Data Recovery",
            desc: "Retrieving or restoring inaccessible, lost, corrupted, or deleted data from various storage devices.",
            img: "https://images.ctfassets.net/5kq8dse7hipf/2incz59PTkwvPl3mRx79Zh/cee2090cd8959cef348725224c71a445/Feature-data-recovery-cost.jpg",
        },
        {
            title: "Charging Port Repair",
            desc: "Fixing or replacing the charging port of an electronic device to ensure proper connectivity and charging functionality.",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHIKUmMv3lkhLsTE_LCdicKIOcn9SLnB0YUg&s",
        },
        {
            title: "Keyboard Replacement",
            desc: "Replacing a faulty or damaged keyboard on a laptop or desktop computer to restore typing functionality.",
            img: "https://tiimg.tistatic.com/fp/1/007/228/laptop-repair-service-083.jpg",
        },
        {
            title: "RAM Upgrade",
            desc: "Increasing the amount of Random Access Memory (RAM) in a computer to improve performance and multitasking capabilities.",
            img: "https://us.v-cdn.net/6036147/uploads/RF6Y2EE3TBXW/r-26-5-1-1200x675.jpg",
        },
        {
            title: "Virus/Malware Removal",
            desc: "Detecting and eliminating malicious software from a computer or device to ensure security and optimal performance.",
            img: "https://www.freedomforum.org/wp-content/uploads/2024/05/1000x564_column_060122.jpg",
        },
    ];

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Do We Fix</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition"
                    >
                        <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FixListSection;
