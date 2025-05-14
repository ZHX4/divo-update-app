import React from 'react';
import Head from 'next/head';
import { Container, Heading, Text, Box, VStack, Divider } from '@chakra-ui/react';
import MainLayout from '../components/layout/MainLayout';
import SupabaseTest from '../components/common/SupabaseTest';

const SupabaseTestPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Supabase Connection Test | Divo</title>
        <meta name="description" content="Test Supabase connection" />
      </Head>
      
      <Container maxW="container.lg" py={10}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="xl" mb={2}>Supabase Connection Test</Heading>
            <Text color="gray.600">
              This page tests the connection to your Supabase instance.
            </Text>
          </Box>

          <Divider />

          <Box>
            <SupabaseTest />
          </Box>
          
          <Box mt={8} p={5} bg="gray.50" borderRadius="md">
            <Heading as="h3" size="md" mb={4}>Supabase Connection Details</Heading>
            <Text fontWeight="bold">URL:</Text>
            <Text mb={2} fontFamily="monospace">https://vzuuntsfdpwnwxwjhcuj.supabase.co</Text>
            
            <Text fontWeight="bold" mt={4}>Project Status:</Text>
            <Text>
              The Supabase project is configured and should be ready to use throughout the application.
            </Text>
          </Box>
        </VStack>
      </Container>
    </MainLayout>
  );
};

export default SupabaseTestPage;