const BUSINESSES = [
  {
    name: "ShelfDrop",
    category: "Dropshipping",
    description: "Automated home goods dropshipping store",
    color: ["#DBEAFE", "#BFDBFE"] as const,
    image: "/businesses/ShelfDrop.jpg",
    tags: ["Payments", "Automation"],
  },
  {
    name: "CartedUp",
    category: "Shopify Store",
    description: "Trending gadgets e-commerce brand",
    color: ["#CCFBF1", "#99F6E4"] as const,
    image: "/businesses/cartedup.png",
    tags: ["Payments", "Analytics", "Automation"],
  },
  {
    name: "AdStack",
    category: "Media Buying",
    description: "Performance marketing agency",
    color: ["#FEF9C3", "#FDE68A"] as const,
    image: "/businesses/adstack.png",
    tags: ["Analytics", "AI-Driven"],
  },
  {
    name: "FlipHaus",
    category: "Reselling",
    description: "Sneaker & streetwear resale platform",
    color: ["#FEE2E2", "#FECACA"] as const,
    image: "/businesses/fliphaus.png",
    tags: ["Payments", "Integrations"],
  },
  {
    name: "LabelDrop",
    category: "White Label",
    description: "Private label supplements brand",
    color: ["#E0E7FF", "#C7D2FE"] as const,
    image: "/businesses/labeldrop.png",
    tags: ["Data Forms", "Automation"],
  },
  {
    name: "Architecture Stockholm",
    category: "Architecture",
    description: "Modern architectural design studio",
    color: ["#E0E7FF", "#C7D2FE"] as const,
    image: "/businesses/architecturestockholm.png",
    tags: ["Data Forms", "Integrations"],
  },
  {
    name: "BundleIt",
    category: "E-commerce",
    description: "Product bundling & upsell store",
    color: ["#FFE4E6", "#FECDD3"] as const,
    image: "/businesses/BundleIt.png",
    tags: ["Payments", "AI-Driven", "Automation"],
  },
  {
    name: "MailMint",
    category: "Email Marketing",
    description: "Newsletter monetization platform",
    color: ["#CFFAFE", "#A5F3FC"] as const,
    image: "/businesses/mailmint.png",
    tags: ["Automation", "Analytics"],
  },
  {
    name: "DropZone",
    category: "Dropshipping",
    description: "TikTok viral product store",
    color: ["#F3E8FF", "#E9D5FF"] as const,
    image: "/businesses/dropzone.png",
    tags: ["AI-Driven", "Payments"],
  },
  {
    name: "BartZoga",
    category: "Wellness",
    description: "Yoga & meditation studio platform",
    color: ["#FDE68A", "#FCD34D"] as const,
    image: "/businesses/BartZoga.png",
    tags: ["Data Forms", "Payments"],
  },
  {
    name: "Custom Burger",
    category: "Food & Beverage",
    description: "Build-your-own burger ordering system",
    color: ["#FED7AA", "#FDBA74"] as const,
    image: "/businesses/Custom-Burger.png",
    tags: ["Payments", "Automation"],
  },
  {
    name: "Elsa Pottery",
    category: "Handmade Goods",
    description: "Artisan ceramics & pottery store",
    color: ["#E0E7FF", "#C7D2FE"] as const,
    image: "/businesses/elsapottery.png",
    tags: ["Payments", "Data Forms"],
  },
  {
    name: "Fuel Engine",
    category: "Automotive",
    description: "Performance parts & tuning shop",
    color: ["#FEE2E2", "#FECACA"] as const,
    image: "/businesses/Fuel-Engine.png",
    tags: ["Analytics", "Integrations"],
  },
  {
    name: "Noir Hair",
    category: "Beauty",
    description: "Premium hair care & styling brand",
    color: ["#F3E8FF", "#E9D5FF"] as const,
    image: "/businesses/Noir-Hair.png",
    tags: ["Payments", "AI-Driven"],
  },
  {
    name: "Peak Share",
    category: "Finance",
    description: "Investment tracking & portfolio tools",
    color: ["#D1FAE5", "#A7F3D0"] as const,
    image: "/businesses/Peak-Share.png",
    tags: ["Analytics", "Automation"],
  },
  {
    name: "Skate Empire",
    category: "Skateboarding",
    description: "Premium skate gear & apparel store",
    color: ["#FEE2E2", "#FECACA"] as const,
    image: "/businesses/skateEmpire.jpg",
    tags: ["Payments", "Integrations"],
  },
];

type Business = (typeof BUSINESSES)[number];

function BusinessCard({ name, category, description, color, image, tags }: Business) {
  return (
    <div className="flex-shrink-0 w-[240px] md:w-[300px] group cursor-pointer">
      {/* 16:9 image / colored placeholder */}
      <div className="aspect-video w-full rounded-xl overflow-hidden relative">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${color[0]}, ${color[1]})`,
            }}
          >
            <span
              className="text-4xl font-bold select-none"
              style={{ color: `${color[1]}` }}
            >
              {name.charAt(0)}
            </span>
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2 py-0.5 rounded-full bg-white/60 backdrop-blur-sm text-[10px] font-medium text-[#191919]/70 uppercase tracking-wider">
            {category}
          </span>
        </div>
      </div>
      {/* Info */}
      <div className="mt-2.5 px-1">
        <h3 className="text-sm font-medium text-[#191919]/90 group-hover:text-[#191919] transition-colors">
          {name}
        </h3>
        <p className="text-xs text-[#999999] mt-0.5">{description}</p>
        <div className="flex flex-wrap gap-1 mt-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-[#333333] text-[#E5E5E5] text-[10px] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BusinessShowcase() {
  const doubled = [...BUSINESSES, ...BUSINESSES];

  return (
    <section className="w-full py-8 overflow-hidden">
      <div className="px-6 mb-4">
        <p className="text-center text-sm text-[#999999]">
          Businesses built with Ernest
        </p>
      </div>

      {/* Scrolling track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FFFCF3] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FFFCF3] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 animate-marquee w-max">
          {doubled.map((biz, i) => (
            <BusinessCard key={`${biz.name}-${i}`} {...biz} />
          ))}
        </div>
      </div>
    </section>
  );
}
