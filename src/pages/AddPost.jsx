import { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Textarea, VStack, Heading, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("black", "white");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, content, tags: tags.split(",").map(tag => tag.trim()) };
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    localStorage.setItem("posts", JSON.stringify([newPost, ...existingPosts]));
    navigate("/");
  };

  return (
    <Container maxW="container.md" mt={10} bg={bg} color={color} p={5} borderRadius="md" boxShadow="md">
      <Heading as="h2" size="xl" mb={6}>Add New Blog Post</Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl id="content" isRequired>
            <FormLabel>Content</FormLabel>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
          </FormControl>
          <FormControl id="tags">
            <FormLabel>Tags (comma separated)</FormLabel>
            <Input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">Add Post</Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default AddPost;