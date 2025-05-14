import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const ChakraComponents = dynamic(
  () => import('../../components/ChakraAdminDashboard'),
  { ssr: false }
);import{
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiMoreVertical,
  FiSearch,
  FiUserPlus,
  FiUsers,
  FiUserCheck,
  FiFilter,
  FiCalendar,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiTrendingUp,
  FiStar
} from 'react-icons/fi';
import MainLayout from '../../components/layout/MainLayout';
import useAuth from '../../hooks/useAuth';

const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Labed Mahfoud',
    specialty: 'Cardiologist',
    hospital: 'Central Hospital',
    email: 'labed.mahfoud@example.com',
    phone: '+213 678 901 234',
    status: 'Active',
    registrationDate: '2023-02-15',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Dr. Farid Benkhelifa',
    specialty: 'Pediatrician',
    hospital: 'Children\'s Medical Center',
    email: 'farid.benkhelifa@example.com',
    phone: '+213 678 901 234',
    status: 'Active',
    registrationDate: '2023-03-10',
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Dr. Douaa Bouden',
    specialty: 'Neurologist',
    hospital: 'Neuroscience Institute',
    email: 'douaa.bouden@example.com',
    phone: '+213 678 901 234',
    status: 'Pending',
    registrationDate: '2023-04-22',
    rating: 4.9,
  },
  {
    id: 4,
    name: 'Dr. Farhet Mounir',
    specialty: 'Dermatologist',
    hospital: 'Skin & Wellness Clinic',
    email: 'farhet.mounir@example.com',
    phone: '+213 678 901 234',
    status: 'Active',
    registrationDate: '2023-01-05',
    rating: 4.7,
  },
  {
    id: 5,
    name: 'Dr. Abdellah Djadour',
    specialty: 'Orthopedic Surgeon',
    hospital: 'Orthopedic Specialty Hospital',
    email: 'abdellah.djadour@example.com',
    phone: '+213 678 901 234',
    status: 'Inactive',
    registrationDate: '2023-02-28',
    rating: 4.5,
  }
];

const mockUsers = [
  {
    id: 1,
    name: 'Mounim Benkhaled',
    email: 'mounim.benkhaled@example.com',
    phone: '+213 555 111 222',
    registrationDate: '2023-01-10',
    status: 'Active',
    lastLogin: '2023-05-10 14:30:45',
    appointmentsCount: 7,
  },
  {
    id: 2,
    name: 'Hameed Chouar',
    email: 'hameed.chaour@example.com',
    phone: '+213 555 333 444',
    registrationDate: '2023-02-05',
    status: 'Active',
    lastLogin: '2023-05-09 10:15:20',
    appointmentsCount: 3,
  },
  {
    id: 3,
    name: 'Mohamed Benkhelifa',
    email: 'mohemed.benkhelifa@example.com',
    phone: '+213 555 555 666',
    registrationDate: '2023-03-15',
    status: 'Inactive',
    lastLogin: '2023-04-15 09:45:10',
    appointmentsCount: 0,
  },
  {
    id: 4,
    name: 'Fatima Benkhelifa',
    email: 'fatima.benkhelifa@example.com',
    phone: '+213 555 777 888',
    registrationDate: '2023-01-25',
    status: 'Active',
    lastLogin: '2023-05-10 16:20:30',
    appointmentsCount: 12,
  },
  {
    id: 5,
    name: 'samira haddad',
    email: 'samira.haddad@example.com',
    phone: '+213 555 999 000',
    registrationDate: '2023-04-02',
    status: 'Active',
    lastLogin: '2023-05-08 11:05:55',
    appointmentsCount: 2,
  }
];

const getAdminStats = () => {
  return {
    totalDoctors: mockDoctors.length,
    activeDoctors: mockDoctors.filter(d => d.status === 'Active').length,
    pendingDoctors: mockDoctors.filter(d => d.status === 'Pending').length,
    totalUsers: mockUsers.length,
    activeUsers: mockUsers.filter(u => u.status === 'Active').length,
    totalAppointments: mockUsers.reduce((sum, user) => sum + user.appointmentsCount, 0),
    doctorsBySpecialty: {
      'Cardiologist': 1,
      'Pediatrician': 1,
      'Neurologist': 1,
      'Dermatologist': 1,
      'Orthopedic Surgeon': 1
    },
    registrationsByMonth: {
      'Jan': 2,
      'Feb': 2,
      'Mar': 1,
      'Apr': 2,
      'May': 0
    }
  };
};

const StatusBadge = ({ status }) => {
  const statusColors = {
    Active: 'green',
    Inactive: 'red',
    Pending: 'yellow'
  };

  const color = statusColors[status] || 'gray';

  return (
    <Badge colorScheme={color} borderRadius="full" px={2} py={1}>
      {status}
    </Badge>
  );
};

const StatCard = ({ title, stat, icon, helpText, trend, trendValue, colorScheme = "blue" }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const iconBgColorLight = `${colorScheme}.50`;
  const iconBgColorDark = `${colorScheme}.900`;
  const iconBgColor = useColorModeValue(iconBgColorLight, iconBgColorDark);
  const iconColor = `${colorScheme}.500`;

  const trendColor = trend === "up" ? "green.500" :
                    trend === "down" ? "red.500" :
                    "gray.500";

  return (
    <Card
      shadow="md"
      bg={bgColor}
      borderRadius="lg"
      p={4}
      transition="all 0.3s"
      _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
    >
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontSize="sm" color={textColor} mb={1}>{title}</Text>
          <Text fontSize="2xl" fontWeight="bold" mb={1}>{stat}</Text>          <Flex align="center">
            {trend && chakra && (
              <chakra.Stat size="sm" display="flex" alignItems="center" mr={2}>
                <chakra.StatHelpText mb="0" color={trendColor}>
                  {trend === "up" ? <chakra.StatArrow type="increase" /> : <chakra.StatArrow type="decrease" />}
                  <chakra.Text as="span" fontSize="sm">{trendValue}</chakra.Text>
                </chakra.StatHelpText>
              </chakra.Stat>
            )}
            {helpText && (
              <Text fontSize="sm" color={textColor}>{helpText}</Text>
            )}
          </Flex>
        </Box>
        <Flex
          p={3}
          borderRadius="full"
          bg={iconBgColor}
          align="center"
          justify="center"
        >
          {React.createElement(icon, { color: iconColor, size: 20 })}
        </Flex>
      </Flex>
    </Card>
  );
};

const AdminDashboard = () => {
  const [chakra, setChakra] = useState(null);

  useEffect(() => {
    if (ChakraComponents && !chakra) {
      setChakra(ChakraComponents);
    }
  }, [ChakraComponents]);

  const router = useRouter();
  const { user, loading, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [doctorsData, setDoctorsData] = useState(mockDoctors);
  const [usersData, setUsersData] = useState(mockUsers);
  const [stats, setStats] = useState(getAdminStats());
  const [selectedItem, setSelectedItem] = useState(null);

  const [modalStates, setModalStates] = useState({
    isAddModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    onAddModalOpen: () => setModalStates(prev => ({ ...prev, isAddModalOpen: true })),
    onAddModalClose: () => setModalStates(prev => ({ ...prev, isAddModalOpen: false })),
    onEditModalOpen: () => setModalStates(prev => ({ ...prev, isEditModalOpen: true })),
    onEditModalClose: () => setModalStates(prev => ({ ...prev, isEditModalOpen: false })),
    onDeleteModalOpen: () => setModalStates(prev => ({ ...prev, isDeleteModalOpen: true })),
    onDeleteModalClose: () => setModalStates(prev => ({ ...prev, isDeleteModalOpen: false }))
  });

  const [colors, setColors] = useState({
    bgColor: 'white',
    textColor: 'gray.600',
    borderColor: 'gray.200',
    headerBgColor: 'gray.50'
  });

  useEffect(() => {
    if (chakra) {
      const { useColorModeValue } = chakra;
      setColors({
        bgColor: useColorModeValue('white', 'gray.800'),
        textColor: useColorModeValue('gray.600', 'gray.400'),
        borderColor: useColorModeValue('gray.200', 'gray.700'),
        headerBgColor: useColorModeValue('gray.50', 'gray.700')
      });
    }
  }, [chakra]);

  useEffect(() => {
    let filteredDoctors = [...mockDoctors];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredDoctors = filteredDoctors.filter(doctor =>
        doctor.name.toLowerCase().includes(term) ||
        doctor.specialty.toLowerCase().includes(term) ||
        doctor.email.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'all') {
      filteredDoctors = filteredDoctors.filter(doctor =>
        doctor.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    setDoctorsData(filteredDoctors);

    let filteredUsers = [...mockUsers];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== 'all') {
      filteredUsers = filteredUsers.filter(user =>
        user.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    setUsersData(filteredUsers);
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (!loading && !isAdmin) {
      router.push('/');
    }
  }, [user, loading, isAdmin, router]);

  const handleEdit = (item) => {
    setSelectedItem(item);
    onEditModalOpen();
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    onDeleteModalOpen();
  };

  const handleAddNew = () => {
    onAddModalOpen();
  };

  const confirmDelete = () => {
    if (activeTab === 0) {
      setDoctorsData(doctorsData.filter(doc => doc.id !== selectedItem.id));
    } else {
      setUsersData(usersData.filter(user => user.id !== selectedItem.id));
    }
    onDeleteModalClose();
    setSelectedItem(null);
  };
  if (!chakra) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span>Loading components...</span>
          </div>
        </div>
      </div>
    );
  }

  const { Flex, Text } = chakra;

  if (loading) {
    return (
      <MainLayout>
        <Flex height="100vh" align="center" justify="center">
          <Text>Loading...</Text>
        </Flex>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Head>
        <title>Admin Dashboard - Divo</title>
        <meta name="description" content="Admin dashboard for managing doctors and users" />
      </Head>

      <Box as="main" p={{ base: 4, md: 8 }} maxW="7xl" mx="auto">
        {/* Dashboard Header */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'flex-start', md: 'center' }}
          mb={8}
        >
          <Box mb={{ base: 4, md: 0 }}>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Heading as="h1" size="xl" fontWeight="bold">
                Admin Dashboard
              </Heading>
              <Text color={textColor}>
                Manage doctors, users, and system settings
              </Text>
            </motion.div>
          </Box>
          <Button
            leftIcon={<FiPlus />}
            colorScheme="blue"
            onClick={handleAddNew}
            size={{ base: 'sm', md: 'md' }}
          >
            Add {activeTab === 0 ? 'Doctor' : 'User'}
          </Button>
        </Flex>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={5} mb={8}>
            <StatCard
              title="Total Doctors"
              stat={stats.totalDoctors}
              icon={FiUserCheck}
              helpText="Registered in system"
              colorScheme="blue"
            />
            <StatCard
              title="Active Users"
              stat={stats.activeUsers}
              icon={FiUsers}
              trend="up"
              trendValue="+8%"
              colorScheme="green"
            />
            <StatCard
              title="Pending Approvals"
              stat={stats.pendingDoctors}
              icon={FiAlertCircle}
              helpText="Doctors awaiting review"
              colorScheme="orange"
            />
            <StatCard
              title="Total Appointments"
              stat={stats.totalAppointments}
              icon={FiCalendar}
              trend="up"
              trendValue="+12%"
              colorScheme="purple"
            />
          </SimpleGrid>
        </motion.div>

        {/* Main Content */}
        <Card bg={bgColor} shadow="md" borderRadius="lg" mb={8}>
          <CardHeader bg={headerBgColor} borderTopRadius="lg" py={4}>
            <Tabs
              colorScheme="blue"
              variant="enclosed"
              index={activeTab}
              onChange={setActiveTab}
              isFitted
            >
              <TabList>
                <Tab><Box as={FiUserCheck} mr={2} display="inline" />Doctors</Tab>
                <Tab><Box as={FiUsers} mr={2} display="inline" />Users</Tab>
              </TabList>
            </Tabs>
          </CardHeader>
          <CardBody>
            {/* Search and Filter Controls */}
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
              align={{ base: 'stretch', md: 'center' }}
              mb={6}
              gap={4}
            >
              <InputGroup maxW={{ base: '100%', md: '320px' }}>
                <InputLeftElement pointerEvents="none">
                  <FiSearch color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder={`Search ${activeTab === 0 ? 'doctors' : 'users'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>

              <HStack spacing={2}>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  size="md"
                  maxW="200px"
                  aria-label="Filter by status"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  {activeTab === 0 && <option value="pending">Pending</option>}
                </Select>
                <Tooltip label="Reset filters">
                  <IconButton
                    icon={<FiFilter />}
                    aria-label="Reset filters"
                    variant="ghost"
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                    }}
                  />
                </Tooltip>
              </HStack>
            </Flex>

            <Text fontSize="sm" color={textColor} mb={4}>
              Showing {activeTab === 0 ? doctorsData.length : usersData.length} results
            </Text>

            {/* Table Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <TabPanels>
                  <TabPanel p={0}>
                    {/* Doctors Table */}
                    <Box overflowX="auto">
                      <Table variant="simple">
                        <Thead bg={headerBgColor}>
                          <Tr>
                            <Th>Name</Th>
                            <Th>Specialty</Th>
                            <Th>Hospital</Th>
                            <Th>Status</Th>
                            <Th>Rating</Th>
                            <Th isNumeric>Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {doctorsData.map(doctor => (
                            <Tr key={doctor.id} _hover={{ bg: useColorModeValue('gray.50', 'gray.900') }}>
                              <Td>
                                <HStack>
                                  <Box>
                                    <Text fontWeight="medium">{doctor.name}</Text>
                                    <Text fontSize="sm" color={textColor}>{doctor.email}</Text>
                                  </Box>
                                </HStack>
                              </Td>
                              <Td>{doctor.specialty}</Td>
                              <Td>{doctor.hospital}</Td>
                              <Td><StatusBadge status={doctor.status} /></Td>
                              <Td>
                                <HStack>
                                  <Box as={FiStar} color="yellow.400" />
                                  <Text>{doctor.rating}</Text>
                                </HStack>
                              </Td>
                              <Td isNumeric>
                                <HStack justifyContent="flex-end">
                                  <IconButton
                                    icon={<FiEdit2 />}
                                    aria-label="Edit doctor"
                                    size="sm"
                                    colorScheme="blue"
                                    variant="ghost"
                                    onClick={() => handleEdit(doctor)}
                                  />
                                  <IconButton
                                    icon={<FiTrash2 />}
                                    aria-label="Delete doctor"
                                    size="sm"
                                    colorScheme="red"
                                    variant="ghost"
                                    onClick={() => handleDelete(doctor)}
                                  />
                                  <Menu>
                                    <MenuButton
                                      as={IconButton}
                                      aria-label="More options"
                                      icon={<FiMoreVertical />}
                                      variant="ghost"
                                      size="sm"
                                    />
                                    <MenuList>
                                      <MenuItem>View Profile</MenuItem>
                                      <MenuItem>Send Message</MenuItem>
                                      <MenuItem>Update Status</MenuItem>
                                    </MenuList>
                                  </Menu>
                                </HStack>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </Box>
                  </TabPanel>
                  <TabPanel p={0}>
                    {/* Users Table */}
                    <Box overflowX="auto">
                      <Table variant="simple">
                        <Thead bg={headerBgColor}>
                          <Tr>
                            <Th>Name</Th>
                            <Th>Contact</Th>
                            <Th>Status</Th>
                            <Th>Last Login</Th>
                            <Th>Appointments</Th>
                            <Th isNumeric>Actions</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {usersData.map(user => (
                            <Tr key={user.id} _hover={{ bg: useColorModeValue('gray.50', 'gray.900') }}>
                              <Td>
                                <Text fontWeight="medium">{user.name}</Text>
                              </Td>
                              <Td>
                                <Text>{user.email}</Text>
                                <Text fontSize="sm" color={textColor}>{user.phone}</Text>
                              </Td>
                              <Td><StatusBadge status={user.status} /></Td>
                              <Td>{user.lastLogin}</Td>
                              <Td>{user.appointmentsCount}</Td>
                              <Td isNumeric>
                                <HStack justifyContent="flex-end">
                                  <IconButton
                                    icon={<FiEdit2 />}
                                    aria-label="Edit user"
                                    size="sm"
                                    colorScheme="blue"
                                    variant="ghost"
                                    onClick={() => handleEdit(user)}
                                  />
                                  <IconButton
                                    icon={<FiTrash2 />}
                                    aria-label="Delete user"
                                    size="sm"
                                    colorScheme="red"
                                    variant="ghost"
                                    onClick={() => handleDelete(user)}
                                  />
                                  <Menu>
                                    <MenuButton
                                      as={IconButton}
                                      aria-label="More options"
                                      icon={<FiMoreVertical />}
                                      variant="ghost"
                                      size="sm"
                                    />
                                    <MenuList>
                                      <MenuItem>View Profile</MenuItem>
                                      <MenuItem>Send Message</MenuItem>
                                      <MenuItem>Reset Password</MenuItem>
                                    </MenuList>
                                  </Menu>
                                </HStack>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </Box>
                  </TabPanel>
                </TabPanels>
              </motion.div>
            </AnimatePresence>
          </CardBody>
        </Card>
      </Box>

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={onAddModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New {activeTab === 0 ? 'Doctor' : 'User'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Enter name" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" placeholder="Enter email" />
              </FormControl>
              {activeTab === 0 && (
                <>
                  <FormControl isRequired>
                    <FormLabel>Specialty</FormLabel>
                    <Input placeholder="Enter specialty" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Hospital</FormLabel>
                    <Input placeholder="Enter hospital" />
                  </FormControl>
                </>
              )}
              <FormControl isRequired>
                <FormLabel>Phone</FormLabel>
                <Input placeholder="Enter phone number" />
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select defaultValue="Active">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  {activeTab === 0 && <option value="Pending">Pending</option>}
                </Select>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onAddModalClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={onEditModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {activeTab === 0 ? 'Doctor' : 'User'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedItem && (
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input defaultValue={selectedItem.name} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" defaultValue={selectedItem.email} />
                </FormControl>
                {activeTab === 0 && (
                  <>
                    <FormControl isRequired>
                      <FormLabel>Specialty</FormLabel>
                      <Input defaultValue={selectedItem.specialty} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Hospital</FormLabel>
                      <Input defaultValue={selectedItem.hospital} />
                    </FormControl>
                  </>
                )}
                <FormControl isRequired>
                  <FormLabel>Phone</FormLabel>
                  <Input defaultValue={selectedItem.phone} />
                </FormControl>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <Select defaultValue={selectedItem.status}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    {activeTab === 0 && <option value="Pending">Pending</option>}
                  </Select>
                </FormControl>
              </Stack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onEditModalClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete {selectedItem?.name}? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onDeleteModalClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={confirmDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MainLayout>
  );
};

export default AdminDashboard;
