"use client"

import Image from "next/image"
import { Comfortaa } from "next/font/google"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const inter = Comfortaa({
    weight: "700",
    subsets: ["latin"],
    display: "swap",
    style: "normal"
})

export default function Home() {
    const router = useRouter();
    return (
        <main className="bg-background h-screen w-full">
            <section>
                <h1 className={"text-3xl font-bold text-center"+inter.className}>Black Undercovers</h1>
                <div className="flex justify-center flex-wrap space-x-8">
                    <div className="w-max mb-6 rounded-full text-center">
                        <Image src="/civil.png" alt="civilian" width={100} height={100} className="rounded-full border-black border-2" />
                        <p className="text-lg font-semibold">Civilian</p>
                    </div>
                    <div className="w-max mb-6 rounded-full text-center">
                        <Image src="/under.png" alt="civilian" width={100} height={100} className="rounded-full border-black border-2" />
                        <p className="text-lg font-semibold">UnderCover</p>
                    </div>
                    <div className="w-max mb-6 rounded-full text-center">
                        <Image src="/black1.png" alt="civilian" width={100} height={100} className="rounded-full border-black border-2" />
                        <p className="text-lg font-semibold">Mr. Black</p>
                    </div>
                </div>
            </section>
            <Button variant="outline" onClick={()=>{
                router.push("/login")
            }}>Login</Button>
             <Button onClick={()=>{
                router.push("/game")
            }}>Start Playing</Button>
        </main>
    )
}