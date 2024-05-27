import { Box, Container, Flex, Heading, Link, Text, VStack, HStack, Spacer, IconButton, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FaTwitter, FaFacebook, FaInstagram, FaSun, FaMoon } from "react-icons/fa";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("black", "white");

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  return (
    <Box bg={bg} color={color} minH="100vh">
      {/* Navigation Bar */}
      <Box as="nav" bg={useColorModeValue("brand.800", "gray.900")} color="white" py={4}>
        <Container maxW="container.lg">
          <Flex align="center">
            <Heading as="h1" size="lg">My Blog</Heading>
            <Spacer />
            <HStack spacing={8}>
              <Link as={RouterLink} to="/" color="white">Home</Link>
              <Link as={RouterLink} to="#" color="white">About</Link>
              <Link as={RouterLink} to="#" color="white">Blog</Link>
              <Link as={RouterLink} to="#" color="white">Contact</Link>
              <IconButton
                aria-label="Toggle dark mode"
                icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
                onClick={toggleColorMode}
              />
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.lg" mt={10}>
        <Flex direction={{ base: "column", md: "row" }} spacing={10}>
          {/* Blog Posts Section */}
          <Box flex="3">
            <Button as={RouterLink} to="/add-post" colorScheme="blue" mb={6}>Add New Post</Button>
            <VStack spacing={8} align="stretch">
              {posts.map((post, index) => (
                <Box key={index} p={5} shadow="md" borderWidth="1px" bg={useColorModeValue("gray.100", "gray.700")}>
                  <Heading fontSize="xl">{post.title}</Heading>
                  <Text mt={4}>{post.content}</Text>
                  <Text mt={2} fontSize="sm" color="gray.500">Tags: {post.tags.join(", ")}</Text>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Sidebar */}
          <Box flex="1" ml={{ md: 10 }} mt={{ base: 10, md: 0 }}>
            <Heading as="h3" size="md" mb={4}>Recent Posts</Heading>
            <VStack spacing={4} align="stretch">
              {posts.slice(0, 3).map((post, index) => (
                <Link key={index} href="#">{post.title}</Link>
              ))}
            </VStack>
          </Box>
        </Flex>
      </Container>

      {/* Footer */}
      <Box as="footer" bg={useColorModeValue("brand.800", "gray.900")} color="white" py={4} mt={10}>
        <Container maxW="container.lg">
          <Flex justify="center" align="center">
            <HStack spacing={4}>
              <IconButton as="a" href="#" aria-label="Twitter" icon={<FaTwitter />} />
              <IconButton as="a" href="#" aria-label="Facebook" icon={<FaFacebook />} />
              <IconButton as="a" href="#" aria-label="Instagram" icon={<FaInstagram />} />
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Index;