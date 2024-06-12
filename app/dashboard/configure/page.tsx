import React from "react"
import {NavBar} from "@/app/dashboard/components/navBar";
import ConfigureForm from "@/app/components/configure-form";

export default async function Configure() {
    return (
        <div>
            <main className="min-h-screen p-8 pb-24">
                <NavBar/>
                <section className="max-w-6xl mx-auto space-y-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold">
                        AI Configuration
                    </h1>
                    <p className="text-base-content/80">
                    </p>
                    <ConfigureForm/>
                </section>
            </main>
        </div>
    )
}