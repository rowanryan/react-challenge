import React from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../../../getToken";
import config from "../../../config";
import "../styles/_discover.scss";

export default function Discover() {
    const newReleasesQuery = useQuery({
        queryKey: ["newReleases"],
        queryFn: async () => {
            const token = await getToken();

            const response = await fetch(
                `${config.api.baseUrl}/${config.api.endpoints.newReleases}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch new releases: ${response.statusText}`
                );
            }

            return response.json();
        },
    });

    const categoriesQuery = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const token = await getToken();

            const response = await fetch(
                `${config.api.baseUrl}/${config.api.endpoints.categories}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch new releases: ${response.statusText}`
                );
            }

            return response.json();
        },
    });

    return (
        <div className="discover">
            {newReleasesQuery.data && (
                <DiscoverBlock
                    text="RELEASED THIS WEEK"
                    id="released"
                    data={newReleasesQuery.data.albums.items}
                />
            )}

            {categoriesQuery.data && (
                <DiscoverBlock
                    text="BROWSE"
                    id="browse"
                    data={categoriesQuery.data.categories.items}
                    imagesKey="icons"
                />
            )}
        </div>
    );
}
