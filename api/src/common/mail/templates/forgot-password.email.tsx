import React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface ForgotPasswordProps {
  name: string;
  url: string;
}

export const ForgotPasswordEmail: React.FC<ForgotPasswordProps> = ({
  name,
  url,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Forgot Password ProArq SaaS</Preview>
      <Tailwind>
        <Body className="bg-white py-4">
          <Container className="font-sans border bg-gray-100/30 rounded-lg shadow-md p-4">
            <Section className="flex justify-start items-center w-full">
              <Heading className="font-bold text-[1.5rem] flex justify-center items-center gap-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-stack-2 bg-black text-white rounded p-1"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 4l-8 4l8 4l8 -4l-8 -4" />
                  <path d="M4 12l8 4l8 -4" />
                  <path d="M4 16l8 4l8 -4" />
                </svg>
                ProArq SaaS
              </Heading>
            </Section>
            <Hr />
            <Section>
              <Text>Hello {name}!</Text>
              <Text>
                Someone recently requested a password change for your{' '}
                <strong>ProArq SaaS</strong> account. If this was you, you can
                set a new password here:
              </Text>
              <Button className="bg-black p-2 text-white rounded" href={url}>
                Reset Password
              </Button>
              <Text>
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
              <Text>
                To keep your account secure, please don&apos;t forward this
                email to anyone.{' '}
              </Text>
              <Text>Happy journey!</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ForgotPasswordEmail;
