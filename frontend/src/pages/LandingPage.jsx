import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

const LandingPage = () => {
  return (
    <Box
      height="100vh"
      bgGradient="linear(to-b, #1a202c, #2d3748)"
      color="white"
      width="100vw"
      textAlign="center"
    >
      <Text
        fontSize={{ base: "3xl", md: "5xl" }}
        fontWeight="bold"
        mt={8}
        textColor={"gray.300"}
      >
        MERN Stack Project Template
      </Text>
      <Text
        fontSize={{ base: "md", md: "xl" }}
        mt={4}
        maxW="600px"
        ml={"auto"}
        mr={"auto"}
      >
        A ready-to-use template to kickstart your MERN stack project with
        pre-configured settings and best practices.
      </Text>
      <Button
        mt={6}
        colorScheme="blue"
        size="lg"
        onClick={() => alert("Start Coding!")}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default LandingPage;
