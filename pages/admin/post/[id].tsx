import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import { dataURLtoFile } from '@libs/file';
import type { Post, Tag } from '@prisma/client';
import Sidebar from 'components/admin/sidebar';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import prisma from '@services/prisma';
import { useRouter } from 'next/router';

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
];

// use get initial props to get post data
export async function getServerSideProps({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      tags: true,
    },
  });

  const tags = await prisma.tag.findMany({});

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      tags: JSON.parse(JSON.stringify(tags)),
    },
  };
}

function Home({ post, tags }: { post: Post & { tags: Tag[] }; tags: Tag[] }) {
  const [value, setValue] = useState('');
  const [onPreview, setOnPreview] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>(tags[0].name);
  const router = useRouter();

  const toast = useToast();

  useEffect(() => {
    setValue(post.content);
    setTitle(post.title);
    if (post.tags.length > 0) {
      setSelectedTag(post.tags[0].name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      if (src.startsWith('http')) {
        // get the id from this format `https://drive.google.com/uc?export=view&id=${id}`
        const id = src.split('id=')[1];
        imagesId.push(id);
        continue;
      }
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

    const res = await fetch('/api/admin/post', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: post.id,
        title,
        content: result,
        images: imagesId,
        tags: [selectedTag],
      }),
    });

    if (res.ok) {
      router.push('/admin/post');
    } else {
      toast({
        title: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!post) {
    router.push('/admin/post');
    return null;
  }

  return (
    <Flex flexDir="row" w="100%" bg="primary.100">
      <Sidebar />
      <Container p={4}>
        <Heading>Edit Post</Heading>

        <HStack gap={5} my={5}>
          <Text>Title: </Text>
          <Input
            placeholder="Insert title here..."
            size="xl"
            variant="unstyled"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Select w="200px" onChange={(e) => setSelectedTag(e.target.value)}>
            {tags.map((tag) => (
              <option key={tag.name}>{tag.name}</option>
            ))}
          </Select>
          <Button onClick={() => setOnPreview(!onPreview)}>Preview</Button>
          <Button onClick={handleSubmit}>Update Post</Button>
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

export default Home;
