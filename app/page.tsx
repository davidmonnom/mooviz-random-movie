"use client";

import NextImage from "next/image";
import { MoovizContext } from "@/app/context";
import { Box, Flex, Image, Pill, Rating, Text } from "@mantine/core";
import { useContext } from "react";
import getImagePath from "@/utils/imagePath";
import getGenreNames from "@/utils/genreName";
import NavBar from "@/components/Navbar";
import "../styles/page.scss";
import Link from "next/link";

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
            <Flex w={"100%"} style={{ color: "black" }} mt={"xl"} direction={"column"} className="movie-info">
              <Flex hiddenFrom="md" justify={"center"} mb={"md"}>
                <Image
                  src={getImagePath(context.current)}
                  height={250}
                  alt={context.current?.title}
                  fallbackSrc="https://placehold.co/1080x1920?text=Placeholder"
                  style={{
                    borderRadius: "30px",
                  }}
                />
              </Flex>
              <Text className="move-title">{context.current?.title}</Text>
              <Text className="movie-description">
                {context.current?.overview ||
                  "No description was found for this movie."}
              </Text>
            </Flex>
            <Flex align={"end"} justify={"space-between"} w={"100%"} pb={"10px"}>
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
              <Flex align={"center"} gap={"sm"} style={{ cursor: "pointer" }}>
                <Text size="xl" style={{ color: "black" }}>
                  {new Date(context.current?.release_date).getFullYear()}
                </Text>
                <Link
                  href={`https://www.google.com/search?q=${context.current?.title}`}
                  target="_blank"
                >
                  <Flex
                    align={"center"}
                    justify={"center"}
                    bg={"white"}
                    style={{ borderRadius: "10px" }}
                    h={"40px"}
                    w={"40px"}
                  >
                    <Image
                      component={NextImage}
                      src="/google.webp"
                      alt="Search"
                      width={30}
                      height={30}
                    />
                  </Flex>
                </Link>
              </Flex>
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
