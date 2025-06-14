"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
function Home() {
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        router.replace("/login");
    }, [router]);
    return <div></div>;
}
