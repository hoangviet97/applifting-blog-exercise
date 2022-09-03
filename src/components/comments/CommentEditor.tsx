import React, { FC } from "react";
import { Form, Button, Input } from "antd";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}

const CommentEditor: FC<Props> = ({ onChange, onSubmit, submitting, value }) => {
  const { TextArea } = Input;

  return (
    <>
      <Form.Item>
        <TextArea autoSize onChange={onChange} value={value} placeholder="Join the discussion" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );
};

export default CommentEditor;
