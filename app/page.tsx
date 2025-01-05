"use client";

import { MoovizContext } from "@/app/context";
import { Box, Flex, Image, Pill, Rating, Text } from "@mantine/core";
import { useContext } from "react";
import getImagePath from "@/utils/imagePath";
import getGenreNames from "@/utils/genreName";
import NavBar from "@/components/Navbar";
import "../styles/page.scss";

export default function Home() {
  const context = useContext(MoovizContext);

  return (
    <Flex w={"100%"} h={"100vh"} style={{ overflow: "scroll" }}>
      <Flex
        h={"100%"}
        style={{ flexGrow: 1, padding: "5%" }}
        align={"start"}
        justify={"space-between"}
        direction={"column"}
      >
        <NavBar />
        {context.current && (
          <>
            <Box style={{ color: "black" }} mt={"xl"}>
              <Text className="move-title">{context.current?.title}</Text>
              <Text>
                {context.current?.overview ||
                  "No description was found for this movie."}
              </Text>
            </Box>
            <Flex align={"end"} justify={"space-between"} w={"100%"}>
              <Box>
                <Rating
                  value={(context.current?.vote_average / 10) * 5}
                  color={context.current?.vote_average > 7 ? "teal" : "red"}
                  style={{ marginTop: "20px" }}
                />
                <Flex gap={"xs"} mt={"xs"}>
                  {getGenreNames(context.availableGenres, context.current).map(
                    (genre) => (
                      <Pill key={genre}>{genre}</Pill>
                    )
                  )}
                </Flex>
              </Box>
              <Text size="xl" style={{ color: "black" }}>
                {new Date(context.current?.release_date).getFullYear()}
              </Text>
            </Flex>
          </>
        )}
      </Flex>
      <Flex
        h={"100%"}
        justify={"end"}
        p={"5% 5% 5% 0"}
        w={"40%"}
        style={{ flexShrink: 0 }}
        visibleFrom="md"
      >
        <Image
          src={getImagePath(context.current)}
          alt={context.current?.title}
          fallbackSrc="https://placehold.co/1080x1920?text=Placeholder"
          style={{
            borderRadius: "30px",
          }}
        />
      </Flex>
    </Flex>
  );
}
