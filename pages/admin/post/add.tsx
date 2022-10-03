import { Box, Button, Container, Heading, HStack, Input, Text } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
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

  return (
    <Container>
      <Heading>Add Post</Heading>

      <HStack gap={5} my={5}>
        <Text>Title: </Text>
        <Input placeholder="Insert title here..." size="xl" variant="unstyled" />
        <Button onClick={() => setOnPreview(!onPreview)}>Preview</Button>
        <Button>Add Post</Button>
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
        <div>{value}</div>
      </Box>
    </Container>
  );
}
