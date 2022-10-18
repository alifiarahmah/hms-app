import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { dataURLtoFile } from '@libs/file';
import Sidebar from 'components/admin/sidebar';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

export default function Home() {
  const [value, setValue] = useState('');
  const [onPreview, setOnPreview] = useState(false);
  const [title, setTitle] = useState('');

  const toast = useToast();

  useEffect(() => {
    // Replace the src in img tag on value with dummy.png
  }, [value]);

  const handleSubmit = async () => {
    if (title === '') {
      toast({
        title: 'Title is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const regex = /<img[^>]*src="([^"]*)"[^>]*>/g;

    let result = value;

    const images = value.matchAll(regex);
    const imagesId = [];
    let i = 0;
    for (let image = images.next(); !image.done; image = images.next()) {
      i++;
      const src = image.value[1];
      // Create file from src (base64 to file)
      // Upload file to server
      // Replace src with uploaded file url

      // check if it's jpg or png
      const type = src.includes('data:image/png') ? 'png' : 'jpg';

      const file = dataURLtoFile(src, `${title}-${i}.${type}`);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);

      const res = await fetch('/api/admin/photo', {
        method: 'POST',
        body: formData,
      });

      const {
        data: { id },
      } = await res.json();

      imagesId.push(id);

      // Replace src with google drive url
      const newSrc = `https://drive.google.com/uc?export=view&id=${id}`;

      result = result.replace(src, newSrc);
    }

    console.log(result);

    const res = await fetch('/api/admin/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content: result,
        images: imagesId,
      }),
    });

    const { success } = await res.json();

    toast({
      title: success ? 'Post created' : 'Failed to create post',
      status: success ? 'success' : 'error',
      duration: 3000,
    });
  };

  return (
    <Flex flexDir="row" w="100%" bg="primary.100">
      <Sidebar />
      <Container p={4}>
        <Heading>Add Post</Heading>

        <HStack gap={5} my={5}>
          <Text>Title: </Text>
          <Input
            placeholder="Insert title here..."
            size="xl"
            variant="unstyled"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button onClick={() => setOnPreview(!onPreview)}>Preview</Button>
          <Button onClick={handleSubmit}>Add Post</Button>
        </HStack>
        <Box display={onPreview ? 'none' : 'block'}>
          <QuillNoSSRWrapper
            modules={modules}
            formats={formats}
            theme="snow"
            placeholder="Insert content here..."
            value={value}
            onChange={setValue}
          />
        </Box>
        <Box display={onPreview ? 'block' : 'none'}>
          <div dangerouslySetInnerHTML={{ __html: value }} />
        </Box>
      </Container>
    </Flex>
  );
}
