import { Button, Input } from '@chakra-ui/react';
import { useRef } from 'react';

interface FileInputProps {
  children?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = ({ children, onChange, ...props }: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <Button onClick={handleClick} {...props}>
        {children}
      </Button>
      <Input ref={inputRef} type="file" display="none" onChange={onChange} />
    </>
  );
};

export default FileInput;
