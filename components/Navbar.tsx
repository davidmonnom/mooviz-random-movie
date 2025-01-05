"use client";

import { MoovizContext } from "@/app/context";
import { ActionIcon, Flex, Text } from "@mantine/core";
import { useContext } from "react";
import { PiFilmSlateFill } from "react-icons/pi";
import Settings from "./Settings";

export default function NavBar() {
  const context = useContext(MoovizContext);

  return (
    <Flex gap={"md"} w={"100%"} justify={"space-between"}>
      <ActionIcon
        loading={context.loading}
        onClick={() => context.getMovie()}
        w={"auto"}
        p={"0 10px"}
        variant="gradient"
        size={"lg"}
        aria-label="Gradient action icon"
        gradient={{ from: "yellow", to: "orange", deg: 254 }}
      >
        <Flex align={"center"} gap={"sm"}>
          <PiFilmSlateFill />
          <Text size="xl">Mooviz</Text>
        </Flex>
      </ActionIcon>

      <Flex gap={"xs"}>
        <Settings />
        <ActionIcon
          loading={context.loading}
          onClick={() => context.getMovie()}
          w={"auto"}
          p={"0 10px"}
          variant="gradient"
          size={"lg"}
          aria-label="Gradient action icon"
          gradient={{ from: "yellow", to: "orange", deg: 254 }}
        >
          <Text
            size="sm"
            style={{
              textTransform: "uppercase",
            }}
          >
            Search
          </Text>
        </ActionIcon>
      </Flex>
    </Flex>
  );
}
