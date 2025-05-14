import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { format, isAfter, subDays } from 'date-fns';
import dynamic from 'next/dynamic';

// Dynamically import Chakra UI components with SSR disabled
const ChakraComponents = dynamic(
  () => import('../../components/ChakraDoctorDashboard'),
  { ssr: false }
);
import {
  FiUsers,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiArrowRight,
  FiArrowDown,
  FiArrowUp,
  FiClock,
  FiVideo,
  FiUser,
  FiMessageCircle,
  FiMoreVertical,
  FiFileText,
  FiCircle,
  FiPieChart,
  FiBarChart2,
  FiPlus
} from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart as PieChartWrapper,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { Line as ChartJSLine } from 'react-chartjs-2';
import MainLayout from '../../components/layout/MainLayout';
import { useAuth } from '../../hooks/useAuth';
import { useAppointments } from '../../hooks/useAppointments';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Alert from '../../components/common/Alert';
import { calculateDashboardStats } from '../../utils/dashboardStats';
import RecurringAppointmentsManager from '../../components/appointments/RecurringAppointmentsManager';

// Color constants
const COLORS = ['#3182CE', '#38B2AC', '#ED8936', '#E53E3E', '#805AD5', '#38A169'];

// Convert constant to a function to avoid hook rule violations
const getAppointmentStatusColors = () => {
  return {
    scheduled: 'blue',
    confirmed: 'green',
    completed: 'teal',
    cancelled: 'red',
    'no-show': 'orange',
    rescheduled: 'purple'
  };
};

// Mock patient data
const MOCK_PATIENTS = [
  {
    id: '1',
    name: 'Mounim Benkhaled',
    avatar: '/images/patients/patient-1.png',
    lastAppointment: '2025-04-15',
    age: 45,
    condition: 'Hypertension'
  },
  {
    id: '2',
    name: 'Samira Haddad',
    avatar: '/images/patients/patient-2.png',
    lastAppointment: '2025-04-16',
    age: 36,
    condition: 'Diabetes Type 2'
  },
  {
    id: '3',
    name: 'Mohamed Benkhelifa',
    avatar: '/images/patients/patient-3.png',
    lastAppointment: '2025-04-17',
    age: 52,
    condition: 'Arthritis'
  },
  {
    id: '4',
    name: 'Fatima Benkhelifa',
    avatar: '/images/patients/patient-4.png',
    lastAppointment: '2025-04-18',
    age: 29,
    condition: 'Asthma'
  }
];

// Stat card component
const StatCard = ({ title, value, icon, description, change, changeType }) => {
  // Use React.useState to store Chakra UI components that will be available after dynamic loading
  const [chakra, setChakra] = useState(null);
  
  useEffect(() => {
    // Once ChakraComponents is loaded, update the state
    if (ChakraComponents && !chakra) {
      setChakra(ChakraComponents);
    }
  }, [ChakraComponents]);
  
  // If Chakra components aren't loaded yet, show a loading state
  if (!chakra) {
    return <div>Loading stats...</div>;
  }
  
  const { 
    Box, Flex, Text, Icon, useColorModeValue
  } = chakra;
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const valueColor = useColorModeValue('gray.900', 'white');
  const iconBg = useColorModeValue(`${icon.color}.50`, `${icon.color}.900`);
  const iconColor = `${icon.color}.500`;
  
  return (
    <Box 
      bg={bgColor} 
      p={5} 
      borderRadius="xl" 
      boxShadow="lg"
      position="relative"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
      }}
      borderWidth="1px"
      borderColor={useColorModeValue('gray.100', 'gray.700')}
    >
      <Flex justify="space-between" align="flex-start">
        <Box>
          <Text fontSize="sm" color={textColor} fontWeight="medium">
            {title}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color={valueColor} mt={1}>
            {value}
          </Text>
          {description && (
            <Text fontSize="sm" color={textColor} mt={1}>
              {description}
            </Text>
          )}
          {change && (
            <Flex align="center" mt={2}>
              <Icon 
                as={changeType === 'increase' ? FiArrowUp : FiArrowDown} 
                color={changeType === 'increase' ? 'green.500' : 'red.500'} 
                mr={1}
              />
              <Text 
                fontSize="sm" 
                color={changeType === 'increase' ? 'green.500' : 'red.500'}
                fontWeight="medium"
              >
                {change}
              </Text>
            </Flex>
          )}
        </Box>
        <Flex
          p={3}
          borderRadius="lg"
          bg={iconBg}
          color={iconColor}
          align="center"
          justify="center"
        >
          <Icon as={icon.as} boxSize="1.5rem" />
        </Flex>
      </Flex>
      <Box 
        position="absolute" 
        bottom="-10px" 
        right="-10px" 
        opacity="0.08" 
        fontSize="6xl"
      >
        <Icon as={icon.as} />
      </Box>
    </Box>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.shape({
    as: PropTypes.elementType.isRequired,
    color: PropTypes.string.isRequired
  }).isRequired,
  description: PropTypes.string,
  change: PropTypes.string,
  changeType: PropTypes.oneOf(['increase', 'decrease'])
};

// Enhanced Patient card component
const PatientCard = ({ patient }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const secondaryText = useColorModeValue('gray.600', 'gray.400');
  const highlightColor = useColorModeValue('blue.50', 'blue.900');

  return (
    <Card
      bg={bgColor}
      borderColor={borderColor}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      _hover={{ 
        shadow: "lg", 
        transform: "translateY(-3px)",
        borderColor: useColorModeValue('blue.200', 'blue.700')
      }}
      transition="all 0.3s ease"
    >
      <CardBody p={4}>
        <Flex align="center" justify="space-between" mb={2}>
          <Flex align="center">
            <Avatar
              size="md"
              name={patient.name}
              src={patient.avatar}
              mr={3}
              borderWidth="2px"
              borderColor={useColorModeValue('blue.100', 'blue.700')}
            />
            <Box>
              <Text fontWeight="bold" fontSize="md">{patient.name}</Text>
              <Text fontSize="sm" color={secondaryText}>
                {patient.age} years • {patient.condition}
              </Text>
            </Box>
          </Flex>
          <Menu placement="bottom-end">
            <MenuButton
              as={IconButton}
              icon={<FiMoreVertical />}
              variant="ghost"
              size="sm"
              aria-label="Options"
              borderRadius="full"
              _hover={{ bg: highlightColor }}
            />
            <MenuList fontSize="sm" shadow="lg">
              <MenuItem icon={<FiUser />}>View Profile</MenuItem>
              <MenuItem icon={<FiFileText />}>View Records</MenuItem>
              <MenuItem icon={<FiCalendar />}>Schedule Appointment</MenuItem>
              <MenuItem icon={<FiMessageCircle />}>Send Message</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        
        <Divider my={2} />

        <HStack spacing={4} mt={3} justify="space-between">
          <Box>
            <Text fontSize="xs" color={secondaryText} fontWeight="medium" mb={1}>Last Visit</Text>
            <Text fontSize="sm" fontWeight="medium">{format(new Date(patient.lastAppointment), 'MMM dd, yyyy')}</Text>
          </Box>
          <Button
            size="sm"
            colorScheme="blue"
            variant="outline"
            leftIcon={<FiCalendar />}
            borderRadius="full"
            _hover={{ bg: highlightColor }}
            flexShrink={0}
          >
            Schedule
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );
};

PatientCard.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    lastAppointment: PropTypes.string.isRequired,
    age: PropTypes.number,
    condition: PropTypes.string
  }).isRequired
};

// Enhanced Appointment card component
const AppointmentCard = ({ appointment, colorScheme = "blue" }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const hoverBg = useColorModeValue(`${colorScheme}.50`, `${colorScheme}.900`);

  // Format date and time
  const date = new Date(appointment.appointment_time);
  const formattedDate = format(date, 'MMM dd, yyyy');
  const formattedTime = format(date, 'h:mm a');
  const statusColor = getAppointmentStatusColors()[appointment.status] || 'gray';

  // Extract nested ternary operation into independent statement
  let buttonText = 'View'; // default
  if (appointment.status === 'scheduled') {
    buttonText = 'Confirm';
  } else if (appointment.status === 'confirmed') {
    buttonText = 'Start';
  }

  return (
    <Card
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      _hover={{ 
        shadow: "lg",
        borderColor: `${colorScheme}.300`,
        transform: "translateY(-2px)"
      }}
      transition="all 0.3s"
      position="relative"
    >
      {/* Status indicator strip at the top */}
      <Box 
        h="4px" 
        bg={`${statusColor}.500`} 
        position="absolute"
        top={0}
        left={0}
        right={0}
      />
      
      <CardBody p={4} pt={5}>
        <Flex justify="space-between" align="center" mb={3}>
          <Text fontSize="sm" fontWeight="medium">
            {formattedDate}
          </Text>
          <Badge 
            colorScheme={statusColor} 
            borderRadius="full" 
            px={2} 
            py={0.5}
            textTransform="capitalize"
            fontWeight="medium"
          >
            {appointment.status}
          </Badge>
        </Flex>
        
        <Flex align="center" mb={3}>
          <Avatar
            size="md"
            name={appointment.patient?.full_name || "Patient"}
            src={appointment.patient?.avatar_url}
            mr={3}
            borderWidth="2px"
            borderColor={borderColor}
          />
          <Box>
            <Text fontWeight="semibold">{appointment.patient?.full_name || "Patient"}</Text>
            <Flex align="center" fontSize="sm" color={textColor}>
              <Icon as={FiClock} mr={1} fontSize="xs" />
              {formattedTime}
              {appointment.type === 'video' && (
                <Flex align="center" ml={2}>
                  <Icon as={FiVideo} color="blue.500" mr={1} />
                  <Text>Video</Text>
                </Flex>
              )}
            </Flex>
          </Box>
        </Flex>

        {appointment.reason && (
          <Box 
            p={3} 
            bg={useColorModeValue('gray.50', 'gray.700')} 
            borderRadius="md" 
            mb={3}
            borderLeftWidth="3px"
            borderLeftColor={`${colorScheme}.400`}
          >
            <Text fontSize="sm" color={textColor} noOfLines={2}>
              {appointment.reason}
            </Text>
          </Box>
        )}
        
        <Divider my={2} />
        
        <Flex justify="space-between" align="center" pt={1}>
          <HStack spacing={1}>
            <Tooltip label="View Details" placement="top">
              <IconButton
                aria-label="View details"
                icon={<FiFileText />}
                size="sm"
                variant="ghost"
                borderRadius="full"
              />
            </Tooltip>
            <Tooltip label="Message Patient" placement="top">
              <IconButton
                aria-label="Message patient"
                icon={<FiMessageCircle />}
                size="sm"
                variant="ghost"
                borderRadius="full"
              />
            </Tooltip>
            {appointment.type === 'video' && (
              <Tooltip label="Start Video Call" placement="top">
                <IconButton
                  aria-label="Start video call"
                  icon={<FiVideo />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  borderRadius="full"
                />
              </Tooltip>
            )}
          </HStack>
          
          <Button
            size="sm"
            variant="solid"
            colorScheme={appointment.status === 'scheduled' || appointment.status === 'confirmed' ? statusColor : 'gray'}
            rightIcon={<FiArrowRight />}
            isDisabled={appointment.status === 'completed' || appointment.status === 'cancelled' || appointment.status === 'no-show'}
            borderRadius="full"
          >
            {buttonText}
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

AppointmentCard.propTypes = {
  appointment: PropTypes.shape({
    appointment_time: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    reason: PropTypes.string,
    type: PropTypes.string,
    patient: PropTypes.shape({
      full_name: PropTypes.string,
      avatar_url: PropTypes.string
    })
  }).isRequired,
  colorScheme: PropTypes.string
};

// Chart components for analytics section
const AppointmentsChart = () => {
  const chartBgColor = useColorModeValue('white', 'gray.800');
  const labelColor = useColorModeValue('gray.600', 'gray.300');
  const gridColor = useColorModeValue('gray.100', 'gray.700');
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Appointments',
        data: [25, 30, 22, 40, 35, 48],
        backgroundColor: 'rgba(99, 179, 237, 0.5)',
        borderColor: 'rgba(99, 179, 237, 1)',
        borderWidth: 2,
      },
      {
        label: 'Canceled',
        data: [5, 8, 4, 7, 6, 10],
        backgroundColor: 'rgba(254, 178, 178, 0.5)',
        borderColor: 'rgba(254, 178, 178, 1)',
        borderWidth: 2,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: labelColor
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: gridColor
        },
        ticks: {
          color: labelColor
        }
      },
      x: {
        grid: {
          color: gridColor
        },
        ticks: {
          color: labelColor
        }
      }
    }
  };

  return (
    <Box bg={chartBgColor} p={4} borderRadius="xl" shadow="md">
      <Text fontSize="lg" fontWeight="medium" mb={4}>Monthly Appointments</Text>
      <Box h="300px">
        <ChartJSLine data={data} options={options} />
      </Box>
    </Box>
  );
};

const PatientDemographicsChart = () => {
  const chartBgColor = useColorModeValue('white', 'gray.800');
  const labelColor = useColorModeValue('gray.600', 'gray.300');
  
  const data = {
    labels: ['18-25', '26-35', '36-45', '46-55', '56+'],
    datasets: [
      {
        data: [15, 25, 20, 30, 10],
        backgroundColor: [
          'rgba(99, 179, 237, 0.6)',
          'rgba(66, 153, 225, 0.6)',
          'rgba(26, 32, 44, 0.6)',
          'rgba(113, 128, 150, 0.6)',
          'rgba(160, 174, 192, 0.6)'
        ],
        borderColor: [
          'rgba(99, 179, 237, 1)',
          'rgba(66, 153, 225, 1)',
          'rgba(26, 32, 44, 1)',
          'rgba(113, 128, 150, 1)',
          'rgba(160, 174, 192, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: labelColor
        }
      },
    },
  };

  return (
    <Box bg={chartBgColor} p={4} borderRadius="xl" shadow="md">
      <Text fontSize="lg" fontWeight="medium" mb={4}>Patient Demographics</Text>
      <Box h="300px">
        <Pie data={data} options={options} />
      </Box>
    </Box>
  );
};

const PatientSatisfactionChart = () => {
  const chartBgColor = useColorModeValue('white', 'gray.800');
  const labelColor = useColorModeValue('gray.600', 'gray.300');
  const gridColor = useColorModeValue('gray.100', 'gray.700');
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Satisfaction Score',
        data: [4.5, 4.6, 4.7, 4.5, 4.8, 4.9],
        backgroundColor: 'rgba(72, 187, 120, 0.5)',
        borderColor: 'rgba(72, 187, 120, 1)',
        borderWidth: 2,
        tension: 0.4,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: labelColor
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 4,
        max: 5,
        grid: {
          color: gridColor
        },
        ticks: {
          color: labelColor
        }
      },
      x: {
        grid: {
          color: gridColor
        },
        ticks: {
          color: labelColor
        }
      }
    }
  };

  return (
    <Box bg={chartBgColor} p={4} borderRadius="xl" shadow="md">
      <Text fontSize="lg" fontWeight="medium" mb={4}>Patient Satisfaction</Text>
      <Box h="300px">
        <ChartJSLine data={data} options={options} />
      </Box>
    </Box>
  );
};

const LineChart = React.memo(({ chartData }) => {
  const { colorMode } = useColorMode();
  const lineColor = colorMode === 'dark' ? 'rgba(191, 219, 254, 1)' : 'rgba(59, 130, 246, 1)';
  const gridLineColor = colorMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: gridLineColor,
        },
      },
      x: {
        grid: {
          color: gridLineColor,
        },
      },
    },
  };

  if (!chartData || !chartData.datasets) {
    return <Box>No data available</Box>;
  }

  // Ensure datasets have the correct styling
  const styledChartData = {
    ...chartData,
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      borderColor: lineColor,
      backgroundColor: 'transparent',
      tension: 0.4,
    })),
  };

  return (
    <Box p={4} borderRadius="lg" bg={colorMode === 'dark' ? 'gray.700' : 'white'} boxShadow="sm" overflow="hidden" height="300px">
      <ChartJSLine data={styledChartData} options={options} />
    </Box>
  );
});

LineChart.displayName = 'LineChart';

LineChart.propTypes = {
  chartData: PropTypes.object.isRequired
};

// Remove the duplicate Chart.js BarChart implementation and keep the recharts one that's already imported
const CustomBarChart = React.memo(({ data, title }) => {
  // Move hooks to the top level
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box p={4} bg={bgColor} borderRadius="lg" boxShadow="sm" mb={4}>
      <Text fontSize="md" fontWeight="medium" mb={2}>
        {title}
      </Text>
      <Box h="250px">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.chartData || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke={textColor} />
            <YAxis stroke={textColor} />
            <RechartsTooltip 
              contentStyle={{ backgroundColor: bgColor }} 
            />
            <Bar dataKey="value" fill="#3182CE" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
});

// Add PropTypes for CustomBarChart
CustomBarChart.propTypes = {
  data: PropTypes.shape({
    chartData: PropTypes.array,
  }).isRequired,
  title: PropTypes.string
};

CustomBarChart.displayName = 'CustomBarChart';

// Helper function to get color based on status while respecting color mode
const getStatusColor = (status) => {
  const statusColor = getAppointmentStatusColors()[status];
  return useColorModeValue(`${statusColor}.500`, `${statusColor}.300`);
};

const PieChart = ({ statusData }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const { colorMode } = useColorMode();
  
  // Pre-calculate all status colors at component level to avoid hook rule violations
  const statusColors = {};
  Object.keys(getAppointmentStatusColors()).forEach(status => {
    const colorBase = getAppointmentStatusColors()[status];
    statusColors[status] = colorMode === 'dark' ? `${colorBase}.300` : `${colorBase}.500`;
  });

  return (
    <Box h="250px" w="100%">
      <ResponsiveContainer width="100%" height="100%">
        <PieChartWrapper>
          <Pie
            data={statusData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          >
            {statusData.map((entry) => (
              <Cell 
                key={`cell-${entry.id}`} 
                fill={getAppointmentStatusColors()[entry.name] ? 
                  statusColors[entry.name] : 
                  COLORS[statusData.indexOf(entry) % COLORS.length]} 
              />
            ))}
          </Pie>
          <RechartsTooltip
            contentStyle={{ backgroundColor: bgColor }}
          />
        </PieChartWrapper>
      </ResponsiveContainer>
    </Box>
  );
};

PieChart.propTypes = {
  statusData: PropTypes.array.isRequired
};

// Doctor Dashboard
const DoctorDashboard = () => {
  // Use state to store Chakra UI components once they're loaded
  const [chakra, setChakra] = useState(null);
  
  // Load Chakra UI components dynamically
  useEffect(() => {
    if (ChakraComponents && !chakra) {
      setChakra(ChakraComponents);
    }
  }, [ChakraComponents]);
  
  const { user, loading: authLoading } = useAuth();
  const { appointments, loading: appointmentsLoading, error: appointmentsError, fetchAppointments } = useAppointments();
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [activePatients, setActivePatients] = useState([]);
  
  let bgColor, lightBgColor, borderColor, textColor, accentColor, useColorModeValue;
  
  // Only try to use Chakra hooks if they're available
  if (chakra) {
    useColorModeValue = chakra.useColorModeValue;
    bgColor = useColorModeValue('white', 'gray.800');
    lightBgColor = useColorModeValue('gray.50', 'gray.700');
    borderColor = useColorModeValue('gray.200', 'gray.700');
    textColor = useColorModeValue('gray.600', 'gray.400');
    accentColor = useColorModeValue('blue.500', 'blue.300');
  }

  // Pre-define status colors for both light and dark mode
  const statusColorMap = {};
  const statusColors = getAppointmentStatusColors();
  
  if (chakra && useColorModeValue) {
    Object.keys(statusColors).forEach(status => {
      statusColorMap[status] = {
        light: `${statusColors[status]}.500`,
        dark: `${statusColors[status]}.300`
      };
    });
  }
  
  // Helper function to get status colors based on color mode
  const getStatusColor = (statusName) => {
    if (!chakra || !useColorModeValue) return '';
    
    const statusColors = getAppointmentStatusColors();
    const colorName = statusColors[statusName];
    return useColorModeValue(`${colorName}.500`, `${colorName}.300`);
  };
  
  useEffect(() => {
    // Set mock active patients regardless of user authentication
    setActivePatients(MOCK_PATIENTS);
  }, []);

  const loading = authLoading || appointmentsLoading;
  // If Chakra UI components aren't loaded yet, show a simple loading message
  if (!chakra) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <LoadingSpinner />
          </div>
          <div>Loading dashboard components...</div>
        </div>
      </div>
    );
  }
  
  const { Flex, Text } = chakra;
  
  if (loading) {
    return (
      <MainLayout>
        <Flex minH="calc(100vh-200px)" align="center" justify="center" direction="column">
          <LoadingSpinner size="xl" />
          <Text mt={4} fontSize="lg">Loading your dashboard...</Text>
        </Flex>
      </MainLayout>
    );
  }

  // TEMPORARILY BYPASSED AUTHENTICATION CHECK FOR TESTING
  // Original code:
  // if (!user || user.role !== 'doctor') {
  //   return (
  //     <MainLayout>
  //       <Container maxW="7xl" px={4} py={10}>
  //         <Alert type="error" message="Access Denied. You must be logged in as a doctor." />
  //       </Container>
  //     </MainLayout>
  //   );
  // }

  // Create mock user if none exists
  const mockUser = user || {
    id: 'mock-doctor-id',
    full_name: 'Dr. Demo User',
    role: 'doctor',
    email: 'doctor@example.com'
  };

  const stats = calculateDashboardStats(appointments || []);

  // Enhanced chart data for better visualization
  const appointmentTrends = [
    { month: 'Jan', visits: 45, revenue: 4500 },
    { month: 'Feb', visits: 52, revenue: 5200 },
    { month: 'Mar', visits: 48, revenue: 4800 },
    { month: 'Apr', visits: 61, revenue: 6100 },
    { month: 'May', visits: 55, revenue: 5500 },
    { month: 'Jun', visits: 67, revenue: 6700 },
    { month: 'Jul', visits: 60, revenue: 6000 },
    { month: 'Aug', visits: 63, revenue: 6300 },
    { month: 'Sep', visits: 55, revenue: 5500 },
    { month: 'Oct', visits: 78, revenue: 7800 },
    { month: 'Nov', visits: 85, revenue: 8500 },
    { month: 'Apr', visits: 93, revenue: 9300 }
  ];

  const pieData = Object.entries(stats.appointmentsByType || {
    'Follow-up': 30,
    'New Patient': 25,
    'Consultation': 20,
    'Procedure': 15,
    'Emergency': 10
  }).map(([name, value]) => ({
    name,
    value,
    id: name // Add unique id for key prop
  }));

  const statusData = Object.entries(stats.appointmentsByStatus || {
    'completed': 45,
    'scheduled': 32,
    'cancelled': 12,
    'no-show': 8
  }).map(([name, value]) => ({
    name,
    value,
    id: name
  }));

  // Weekly Schedule
  const weeklyScheduleData = [
    { day: 'Mon', appointments: 8, available: 2 },
    { day: 'Tue', appointments: 12, available: 0 },
    { day: 'Wed', appointments: 7, available: 5 },
    { day: 'Thu', appointments: 9, available: 3 },
    { day: 'Fri', appointments: 10, available: 2 },
    { day: 'Sat', appointments: 5, available: 7 },
    { day: 'Sun', appointments: 0, available: 0 }
  ];

  // Today's appointments
  const today = new Date();
  const todayAppointments = (appointments || []).filter(app => {
    const appDate = new Date(app.appointment_time);
    return appDate.getDate() === today.getDate() &&
           appDate.getMonth() === today.getMonth() &&
           appDate.getFullYear() === today.getFullYear();
  });
  
  // Upcoming appointments (next 7 days)
  const upcomingAppointments = (appointments || []).filter(app => {
    const appDate = new Date(app.appointment_time);
    return isAfter(appDate, today) && 
           !isAfter(appDate, subDays(new Date(today.setDate(today.getDate() + 7)), 1)) &&
           (app.status === 'scheduled' || app.status === 'confirmed');
  });

  return (
    <MainLayout>
      <Head>
        <title>Doctor Dashboard | Divo</title>
        <meta name="description" content="Doctor dashboard for managing appointments and patients." />
      </Head>

      <Box as="main" p={{ base: 4, md: 8 }} maxW="7xl" mx="auto">
        {/* Header with greeting and quick actions */}
        <Box 
          bg={useColorModeValue(
            'linear-gradient(to right, #EBF8FF, #E6FFFA)', 
            'linear-gradient(to right, rgba(44, 82, 130, 0.8), rgba(45, 55, 72, 0.8))'
          )} 
          borderRadius="xl"
          p={{ base: 4, md: 6 }}
          mb={8}
          boxShadow="md"
          position="relative"
          overflow="hidden"
        >
          <Box 
            position="absolute" 
            top="-20px" 
            right="-20px" 
            w="150px" 
            h="150px" 
            borderRadius="full" 
            bg={useColorModeValue('blue.50', 'blue.900')} 
            opacity="0.4" 
          />
          
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            justifyContent="space-between" 
            alignItems={{ base: 'flex-start', md: 'center' }}
          >
            <Box mb={{ base: 4, md: 0 }}>
              <Text 
                color={useColorModeValue('blue.600', 'blue.200')} 
                fontWeight="medium" 
                fontSize="sm"
              >
                {format(new Date(), 'EEEE, MMMM do, yyyy')}
              </Text>
              <Heading 
                as="h1" 
                size="xl" 
                fontWeight="bold" 
                mb={1}
                bgGradient={useColorModeValue(
                  'linear-gradient(to right, blue.600, teal.600)',
                  'linear-gradient(to right, blue.300, teal.300)'
                )}
                bgClip="text"
              >
                Welcome back, Dr. {mockUser.full_name?.split(' ')[1] || mockUser.full_name || mockUser.email?.split('@')[0]}
              </Heading>
              <Text color={textColor}>
                Your Practice Dashboard
              </Text>
            </Box>
            
            <HStack spacing={3}>
              <Button 
                leftIcon={<FiVideo />}
                colorScheme="blue"
                size={{ base: 'sm', md: 'md' }}
                boxShadow="md"
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                transition="all 0.2s"
              >
                Start Consultation
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<FiPlus />}
                  variant="outline"
                  colorScheme="blue"
                  size={{ base: 'sm', md: 'md' }}
                  bg={useColorModeValue('white', 'gray.800')}
                  _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                >
                  Actions
                </MenuButton>
                <MenuList shadow="lg">
                  <MenuItem icon={<FiCalendar />}>Schedule Appointment</MenuItem>
                  <MenuItem icon={<FiUser />}>Add New Patient</MenuItem>
                  <MenuItem icon={<FiFileText />}>Create Medical Record</MenuItem>
                  <MenuItem icon={<FiMessageCircle />}>Send Message</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Box>

        {appointmentsError && (
          <Alert type="error" message={appointmentsError} className="mb-6" />
        )}

        {/* Stats Overview */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={5} mb={8}>
          <StatCard
            title="Total Appointments"
            value={stats.totalAppointments || 542}
            icon={{ as: FiCalendar, color: 'blue' }}
            description="All time"
          />
          <StatCard
            title="This Month"
            value={stats.monthlyAppointments || 93}
            icon={{ as: FiUsers, color: 'teal' }}
            change="+12%"
            changeType="increase"
          />
          <StatCard
            title="Completion Rate"
            value={stats.completionRate || "92%"}
            icon={{ as: FiCheckCircle, color: 'green' }}
            description="Appointments kept"
          />
          <StatCard
            title="Cancellations"
            value={stats.cancelledAppointments || 12}
            icon={{ as: FiXCircle, color: 'red' }}
            change="-3%"
            changeType="decrease"
          />
        </SimpleGrid>

        {/* Main Dashboard Content */}
        <Grid templateColumns={{ base: '1fr', lg: '1fr 320px' }} gap={6}>
          {/* Left Column - Charts and Today's Appointments */}
          <GridItem>
            {/* Charts Section */}
            <Card 
              bg={bgColor} 
              shadow="lg" 
              mb={6} 
              borderRadius="xl" 
              overflow="hidden"
              borderWidth="1px"
              borderColor={useColorModeValue('gray.100', 'gray.700')}
              transition="all 0.3s"
              _hover={{ shadow: "xl" }}
            >
              <CardHeader 
                pb={2} 
                bg={useColorModeValue('gray.50', 'gray.700')} 
                borderBottom="1px" 
                borderColor={borderColor}
              >
                <Flex justify="space-between" align="center">
                  <Heading size="md" fontWeight="bold">Performance Analytics</Heading>
                  <HStack 
                    spacing={1} 
                    bg={useColorModeValue('white', 'gray.800')} 
                    p="1px" 
                    borderRadius="md" 
                    shadow="sm"
                  >
                    <Button 
                      size="sm" 
                      variant={selectedTimeframe === 'week' ? 'solid' : 'ghost'} 
                      colorScheme="blue"
                      onClick={() => setSelectedTimeframe('week')}
                      borderRadius="md"
                      fontWeight={selectedTimeframe === 'week' ? 'bold' : 'medium'}
                      py={1}
                      px={3}
                      minW="60px"
                    >
                      Week
                    </Button>
                    <Button 
                      size="sm" 
                      variant={selectedTimeframe === 'month' ? 'solid' : 'ghost'} 
                      colorScheme="blue"
                      onClick={() => setSelectedTimeframe('month')}
                      borderRadius="md"
                      fontWeight={selectedTimeframe === 'month' ? 'bold' : 'medium'}
                      py={1}
                      px={3}
                      minW="60px"
                    >
                      Month
                    </Button>
                    <Button 
                      size="sm" 
                      variant={selectedTimeframe === 'year' ? 'solid' : 'ghost'} 
                      colorScheme="blue"
                      onClick={() => setSelectedTimeframe('year')}
                      borderRadius="md"
                      fontWeight={selectedTimeframe === 'year' ? 'bold' : 'medium'}
                      py={1}
                      px={3}
                      minW="60px"
                    >
                      Year
                    </Button>
                  </HStack>
                </Flex>
              </CardHeader>
              <CardBody>
                <Tabs 
                  colorScheme="blue" 
                  variant="enclosed" 
                  isFitted 
                  isLazy
                  onChange={(index) => {
                    // Apply animations when changing tabs
                    const chartElements = document.querySelectorAll('.recharts-responsive-container');
                    if (chartElements.length > 0) {
                      chartElements.forEach(el => {
                        el.style.opacity = '0';
                        setTimeout(() => {
                          el.style.opacity = '1';
                        }, 300);
                      });
                    }
                  }}
                >
                  <TabList borderBottomWidth="2px">
                    <Tab 
                      fontWeight="medium" 
                      _selected={{ 
                        color: 'blue.500', 
                        borderBottomWidth: '3px',
                        borderBottomColor: 'blue.500',
                        fontWeight: 'bold' 
                      }}
                    >
                      <Icon as={FiBarChart2} mr={2} /> Appointments
                    </Tab>
                    <Tab 
                      fontWeight="medium" 
                      _selected={{ 
                        color: 'blue.500', 
                        borderBottomWidth: '3px',
                        borderBottomColor: 'blue.500',
                        fontWeight: 'bold' 
                      }}
                    >
                      <Icon as={FiPieChart} mr={2} /> Distribution
                    </Tab>
                    <Tab 
                      fontWeight="medium" 
                      _selected={{ 
                        color: 'blue.500', 
                        borderBottomWidth: '3px',
                        borderBottomColor: 'blue.500',
                        fontWeight: 'bold' 
                      }}
                    >
                      <Icon as={FiCalendar} mr={2} /> Schedule
                    </Tab>
                    <Tab 
                      fontWeight="medium" 
                      _selected={{ 
                        color: 'blue.500', 
                        borderBottomWidth: '3px',
                        borderBottomColor: 'blue.500',
                        fontWeight: 'bold' 
                      }}
                    >
                      <Icon as={FiClock} mr={2} /> Recurring
                    </Tab>
                  </TabList>
                  <TabPanels>
                    {/* Appointments Trend Chart */}
                    <TabPanel p={4} pt={6}>
                      <Box 
                        height="320px"
                        className="recharts-responsive-container" 
                        style={{ transition: 'opacity 0.3s ease' }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={appointmentTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3182CE" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#3182CE" stopOpacity={0.1}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
                            <XAxis dataKey="month" stroke={textColor} />
                            <YAxis stroke={textColor} />
                            <RechartsTooltip 
                              contentStyle={{ backgroundColor: bgColor, borderColor: borderColor }} 
                              cursor={{ stroke: accentColor, strokeWidth: 2 }}
                            />
                            <Legend verticalAlign="top" height={36} />
                            <Area 
                              type="monotone" 
                              dataKey="visits" 
                              name="Patient Visits" 
                              stroke="#3182CE" 
                              fillOpacity={1} 
                              fill="url(#colorVisits)" 
                              activeDot={{ r: 6 }} 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </Box>
                      <Box textAlign="center" mt={2}>
                        <Text fontSize="sm" color={textColor}>
                          Your patient visits have increased by <Text as="span" fontWeight="bold" color="green.500">18%</Text> compared to last {selectedTimeframe}.
                        </Text>
                      </Box>
                    </TabPanel>

                    {/* Appointment Types & Status Charts */}
                    <TabPanel p={0} pt={4}>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={4}>
                        <Box height="300px">
                          <Text fontSize="sm" fontWeight="medium" mb={3} textAlign="center">Appointment Types</Text>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChartWrapper>
                              <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                outerRadius={90}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {pieData.map((entry, index) => (
                                  <Cell key={`cell-${entry.id}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <RechartsTooltip 
                                contentStyle={{ backgroundColor: bgColor, borderColor: borderColor }} 
                              />
                            </PieChartWrapper>
                          </ResponsiveContainer>
                        </Box>

                        <Box height="300px">
                          <Text fontSize="sm" fontWeight="medium" mb={3} textAlign="center">Appointment Statuses</Text>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChartWrapper>
                              <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                outerRadius={90}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {statusData.map((entry) => (
                                  <Cell 
                                    key={`cell-${entry.id}`} 
                                    fill={getAppointmentStatusColors()[entry.name] ? 
                                      getStatusColor(entry.name) : 
                                      COLORS[statusData.indexOf(entry) % COLORS.length]} 
                                  />
                                ))}
                              </Pie>
                              <RechartsTooltip
                                contentStyle={{ backgroundColor: bgColor, borderColor: borderColor }}
                              />
                            </PieChartWrapper>
                          </ResponsiveContainer>
                        </Box>
                      </SimpleGrid>
                      <Box textAlign="center">
                        <Text fontSize="sm" color={textColor}>
                          Follow-up appointments represent your most common appointment type.
                        </Text>
                      </Box>
                    </TabPanel>

                    {/* Weekly Schedule Chart */}
                    <TabPanel p={0} pt={4}>
                      <Box height="320px">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={weeklyScheduleData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }} barGap={0}>
                            <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
                            <XAxis dataKey="day" stroke={textColor} />
                            <YAxis stroke={textColor} />
                            <RechartsTooltip
                              contentStyle={{ backgroundColor: bgColor, borderColor: borderColor }}
                            />
                            <Legend verticalAlign="top" height={36} />
                            <Bar 
                              dataKey="appointments" 
                              name="Booked" 
                              stackId="a" 
                              fill={useColorModeValue('#3182CE', '#4299E1')} 
                              radius={[4, 4, 0, 0]} 
                            />
                            <Bar 
                              dataKey="available" 
                              name="Available" 
                              stackId="a" 
                              fill={useColorModeValue('#E2E8F0', '#4A5568')} 
                              radius={[4, 4, 0, 0]} 
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </Box>
                      <Box textAlign="center" mt={2}>
                        <Text fontSize="sm" color={textColor}>
                          Tuesday is your busiest day with 12 appointments scheduled.
                        </Text>
                      </Box>
                    </TabPanel>

                    {/* Add the new Recurring Appointments Tab Panel */}
                    <TabPanel p={4}>
                      <Box bg={lightBgColor} p={4} borderRadius="lg" shadow="sm">
                        <RecurringAppointmentsManager doctor={mockUser} />
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </CardBody>
            </Card>

            {/* Today's Appointments */}
            <Card bg={bgColor} shadow="md" mb={6} borderRadius="lg">
              <CardHeader pb={2}>
                <Flex justify="space-between" align="center">
                  <Heading size="md">Today's Schedule</Heading>
                  <Badge colorScheme="blue" fontSize="sm" px={2} py={1} borderRadius="md">
                    {todayAppointments.length} Appointments
                  </Badge>
                </Flex>
              </CardHeader>
              <CardBody>
                {todayAppointments.length > 0 ? (
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {todayAppointments.slice(0, 4).map(appointment => (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        colorScheme="blue"
                      />
                    ))}
                  </SimpleGrid>
                ) : (
                  <Flex 
                    direction="column" 
                    align="center" 
                    justify="center" 
                    p={8} 
                    bg={lightBgColor} 
                    borderRadius="md"
                  >
                    <Icon as={FiCalendar} boxSize={10} color="blue.400" mb={4} />
                    <Text mb={4}>You have no appointments scheduled for today</Text>
                    <Button leftIcon={<FiPlus />} colorScheme="blue">
                      Add Appointment
                    </Button>
                  </Flex>
                )}
                
                {todayAppointments.length > 4 && (
                  <Button
                    variant="ghost"
                    colorScheme="blue"
                    rightIcon={<FiArrowRight />}
                    mt={4}
                    size="sm"
                    w="full"
                  >
                    View All {todayAppointments.length} Appointments
                  </Button>
                )}
              </CardBody>
            </Card>

            {/* Upcoming Appointments */}
            <Card bg={bgColor} shadow="md" mb={{ base: 6, lg: 0 }} borderRadius="lg">
              <CardHeader pb={2}>
                <Flex justify="space-between" align="center">
                  <Heading size="md">Upcoming Appointments</Heading>
                  <Button
                    as={Link}
                    href="/appointments"
                    size="sm"
                    colorScheme="blue"
                    variant="ghost"
                    rightIcon={<FiArrowRight />}
                  >
                    View Calendar
                  </Button>
                </Flex>
              </CardHeader>
              <CardBody>
                <Tabs colorScheme="blue" variant="soft-rounded" size="sm" isLazy>
                  <TabList mb={4}>
                    <Tab>Next 7 Days</Tab>
                    <Tab>By Status</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel px={0}>
                      {upcomingAppointments.length > 0 ? (
                        <VStack spacing={4} align="stretch">
                          {upcomingAppointments
                            .sort((a, b) => new Date(a.appointment_time) - new Date(b.appointment_time))
                            .slice(0, 5)
                            .map((appointment, index) => {
                              const formattedDate = format(new Date(appointment.appointment_time), 'EEEE, MMM d');
                              const formattedTime = format(new Date(appointment.appointment_time), 'h:mm a');
                              
                              // Group by date
                              const previousApp = upcomingAppointments[index - 1];
                              const previousDate = previousApp ? 
                                format(new Date(previousApp.appointment_time), 'EEEE, MMM d') : 
                                null;
                              const showDateHeader = index === 0 || formattedDate !== previousDate;
                              
                              return (
                                <React.Fragment key={appointment.id}>
                                  {showDateHeader && (
                                    <Flex 
                                      align="center" 
                                      bg={lightBgColor} 
                                      p={2} 
                                      pl={3} 
                                      borderRadius="md"
                                    >
                                      <Icon as={FiCalendar} mr={2} color="blue.500" />
                                      <Text fontWeight="medium">{formattedDate}</Text>
                                    </Flex>
                                  )}
                                  <Flex 
                                    p={3} 
                                    borderWidth="1px" 
                                    borderRadius="md" 
                                    borderColor={borderColor} 
                                    justify="space-between"
                                    align="center"
                                  >
                                    <Flex align="center">
                                      <Avatar 
                                        size="sm" 
                                        name={appointment.patient?.full_name || "Patient"} 
                                        src={appointment.patient?.avatar_url} 
                                        mr={3}
                                      />
                                      <Box>
                                        <Text fontWeight="medium">
                                          {appointment.patient?.full_name || "Patient"}
                                        </Text>
                                        <Flex align="center">
                                          <Icon as={FiClock} fontSize="xs" mr={1} color={textColor} />
                                          <Text fontSize="sm" color={textColor}>
                                            {formattedTime} • {appointment.type === 'video' ? 'Video' : 'In-person'}
                                          </Text>
                                        </Flex>
                                      </Box>
                                    </Flex>
                                    
                                    <HStack>
                                      <Badge colorScheme={getAppointmentStatusColors()[appointment.status]}>
                                        {appointment.status}
                                      </Badge>
                                      <IconButton
                                        aria-label="View details"
                                        icon={<FiArrowRight />}
                                        size="sm"
                                        variant="ghost"
                                      />
                                    </HStack>
                                  </Flex>
                                </React.Fragment>
                              );
                            })
                          }
                          
                          {upcomingAppointments.length > 5 && (
                            <Button 
                              variant="outline" 
                              colorScheme="blue" 
                              size="sm" 
                              w="full"
                            >
                              View All {upcomingAppointments.length} Appointments
                            </Button>
                          )}
                        </VStack>
                      ) : (
                        <Box p={6} bg={lightBgColor} borderRadius="md" textAlign="center">
                          <Text mb={3}>No upcoming appointments for the next 7 days</Text>
                          <Button colorScheme="blue" size="sm" leftIcon={<FiCalendar />}>
                            View Full Calendar
                          </Button>
                        </Box>
                      )}
                    </TabPanel>
                    <TabPanel px={0}>
                      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                        <Box p={4} borderWidth="1px" borderRadius="md" borderColor={borderColor}>
                          <Flex align="center" mb={3}>
                            <Icon as={FiCheckCircle} color="green.500" boxSize={5} mr={2} />
                            <Text fontWeight="medium">Confirmed</Text>
                          </Flex>
                          <Text fontSize="2xl" fontWeight="bold">
                            {upcomingAppointments.filter(a => a.status === 'confirmed').length}
                          </Text>
                          <Progress 
                            value={upcomingAppointments.filter(a => a.status === 'confirmed').length / Math.max(upcomingAppointments.length, 1) * 100}
                            colorScheme="green"
                            size="sm"
                            mt={2}
                          />
                        </Box>
                        <Box p={4} borderWidth="1px" borderRadius="md" borderColor={borderColor}>
                          <Flex align="center" mb={3}>
                            <Icon as={FiClock} color="orange.500" boxSize={5} mr={2} />
                            <Text fontWeight="medium">Scheduled</Text>
                          </Flex>
                          <Text fontSize="2xl" fontWeight="bold">
                            {upcomingAppointments.filter(a => a.status === 'scheduled').length}
                          </Text>
                          <Progress 
                            value={upcomingAppointments.filter(a => a.status === 'scheduled').length / Math.max(upcomingAppointments.length, 1) * 100}
                            colorScheme="orange"
                            size="sm"
                            mt={2}
                          />
                        </Box>
                      </SimpleGrid>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </CardBody>
            </Card>
          </GridItem>

          {/* Right Column - Patient Info */}
          <GridItem>
            {/* Patient Stats */}
            <Card 
              bg={bgColor} 
              shadow="md" 
              mb={6} 
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderColor}
              overflow="hidden"
              transition="all 0.3s"
              _hover={{ shadow: "lg" }}
            >
              <CardHeader 
                pb={0} 
                bg={useColorModeValue('gray.50', 'gray.700')} 
                borderBottom="1px" 
                borderColor={borderColor}
              >
                <Flex align="center">
                  <Icon as={FiUsers} color="blue.500" mr={2} />
                  <Heading size="md">Patient Overview</Heading>
                </Flex>
              </CardHeader>
              <CardBody>
                <SimpleGrid columns={2} spacing={4} mb={5} mt={2}>
                  <Box 
                    p={3} 
                    borderRadius="lg" 
                    bg={useColorModeValue('blue.50', 'blue.900')}
                    borderWidth="1px"
                    borderColor={useColorModeValue('blue.100', 'blue.800')}
                    position="relative"
                    overflow="hidden"
                  >
                    <Text color={textColor} fontSize="sm" fontWeight="medium" mb={1}>Active Patients</Text>
                    <Text fontSize="2xl" fontWeight="bold">{stats.totalPatients || 128}</Text>
                    <Flex align="center" mt={1}>
                      <Icon as={FiArrowUp} color="green.400" mr={1} fontSize="sm" />
                      <Text color="green.400" fontSize="sm" fontWeight="medium">+12%</Text>
                    </Flex>
                    <Box 
                      position="absolute" 
                      bottom="-5px" 
                      right="-5px" 
                      opacity="0.15" 
                      fontSize="4xl"
                    >
                      <Icon as={FiUsers} />
                    </Box>
                  </Box>
                  <Box 
                    p={3} 
                    borderRadius="lg" 
                    bg={useColorModeValue('teal.50', 'teal.900')}
                    borderWidth="1px"
                    borderColor={useColorModeValue('teal.100', 'teal.800')}
                    position="relative"
                    overflow="hidden"
                  >
                    <Text color={textColor} fontSize="sm" fontWeight="medium" mb={1}>This Week</Text>
                    <Text fontSize="2xl" fontWeight="bold">{stats.weeklyAppointments || 24}</Text>
                    <Text fontSize="sm" color={textColor} mt={1}>Appointments</Text>
                    <Box 
                      position="absolute" 
                      bottom="-5px" 
                      right="-5px" 
                      opacity="0.15" 
                      fontSize="4xl"
                    >
                      <Icon as={FiCalendar} />
                    </Box>
                  </Box>
                </SimpleGrid>

                <Box mb={5}>
                  <Flex justify="space-between" mb={2}>
                    <Text fontSize="sm" fontWeight="medium">Gender Distribution</Text>
                    <HStack spacing={2} fontSize="xs">
                      <Flex align="center">
                        <Box w="2" h="2" bg="blue.400" borderRadius="full" mr={1} />
                        <Text>Male</Text>
                      </Flex>
                      <Flex align="center">
                        <Box w="2" h="2" bg="pink.400" borderRadius="full" mr={1} />
                        <Text>Female</Text>
                      </Flex>
                    </HStack>
                  </Flex>
                  <Box 
                    bg={useColorModeValue('gray.100', 'gray.700')} 
                    borderRadius="full" 
                    h="10px" 
                    overflow="hidden"
                  >
                    <Flex h="100%">
                      <Box flex="3" bg="blue.400" h="full" />
                      <Box flex="2" bg="pink.400" h="full" />
                    </Flex>
                  </Box>
                  <Flex justify="space-between" mt={1}>
                    <Text fontSize="xs" color={textColor}>60%</Text>
                    <Text fontSize="xs" color={textColor}>40%</Text>
                  </Flex>
                </Box>

                <Box mb={6}>
                  <Text fontSize="sm" fontWeight="medium" mb={3}>Age Groups</Text>
                  <SimpleGrid columns={4} spacing={2}>
                    <Box>
                      <Text fontSize="xs" color={textColor} fontWeight="medium" mb={1}>0-18</Text>
                      <Box position="relative" h="60px">
                        <Box 
                          position="absolute" 
                          bottom="0" 
                          left="0" 
                          right="0" 
                          h="15%" 
                          bg={useColorModeValue('purple.100', 'purple.700')}
                          borderRadius="md" 
                        >
                          <Box 
                            position="absolute" 
                            bottom="0" 
                            left="0" 
                            right="0" 
                            h="100%" 
                            bg="purple.400" 
                            borderRadius="md" 
                            transition="height 0.5s"
                          />
                        </Box>
                        <Text 
                          position="absolute"
                          top="0"
                          left="0"
                          right="0"
                          textAlign="center"
                          fontWeight="bold"
                          fontSize="sm"
                          color={useColorModeValue('purple.500', 'purple.200')}
                        >
                          15%
                        </Text>
                      </Box>
                    </Box>
                    <Box>
                      <Text fontSize="xs" color={textColor} fontWeight="medium" mb={1}>19-35</Text>
                      <Box position="relative" h="60px">
                        <Box 
                          position="absolute" 
                          bottom="0" 
                          left="0" 
                          right="0" 
                          h="25%" 
                          bg={useColorModeValue('blue.100', 'blue.700')}
                          borderRadius="md" 
                        >
                          <Box 
                            position="absolute" 
                            bottom="0" 
                            left="0" 
                            right="0" 
                            h="100%" 
                            bg="blue.400" 
                            borderRadius="md" 
                            transition="height 0.5s"
                          />
                        </Box>
                        <Text 
                          position="absolute"
                          top="0"
                          left="0"
                          right="0"
                          textAlign="center"
                          fontWeight="bold"
                          fontSize="sm"
                          color={useColorModeValue('blue.500', 'blue.200')}
                        >
                          25%
                        </Text>
                      </Box>
                    </Box>
                    <Box>
                      <Text fontSize="xs" color={textColor} fontWeight="medium" mb={1}>36-55</Text>
                      <Box position="relative" h="60px">
                        <Box 
                          position="absolute" 
                          bottom="0" 
                          left="0" 
                          right="0" 
                          h="40%" 
                          bg={useColorModeValue('teal.100', 'teal.700')}
                          borderRadius="md" 
                        >
                          <Box 
                            position="absolute" 
                            bottom="0" 
                            left="0" 
                            right="0" 
                            h="100%" 
                            bg="teal.400" 
                            borderRadius="md" 
                            transition="height 0.5s"
                          />
                        </Box>
                        <Text 
                          position="absolute"
                          top="0"
                          left="0"
                          right="0"
                          textAlign="center"
                          fontWeight="bold"
                          fontSize="sm"
                          color={useColorModeValue('teal.500', 'teal.200')}
                        >
                          40%
                        </Text>
                      </Box>
                    </Box>
                    <Box>
                      <Text fontSize="xs" color={textColor} fontWeight="medium" mb={1}>56+</Text>
                      <Box position="relative" h="60px">
                        <Box 
                          position="absolute" 
                          bottom="0" 
                          left="0" 
                          right="0" 
                          h="20%" 
                          bg={useColorModeValue('orange.100', 'orange.700')}
                          borderRadius="md" 
                        >
                          <Box 
                            position="absolute" 
                            bottom="0" 
                            left="0" 
                            right="0" 
                            h="100%" 
                            bg="orange.400" 
                            borderRadius="md" 
                            transition="height 0.5s"
                          />
                        </Box>
                        <Text 
                          position="absolute"
                          top="0"
                          left="0"
                          right="0"
                          textAlign="center"
                          fontWeight="bold"
                          fontSize="sm"
                          color={useColorModeValue('orange.500', 'orange.200')}
                        >
                          20%
                        </Text>
                      </Box>
                    </Box>
                  </SimpleGrid>
                </Box>

                <Divider mb={5} />

                <Text fontSize="sm" fontWeight="medium" mb={3}>Top Conditions</Text>
                <List spacing={3}>
                  <ListItem>
                    <Flex justify="space-between" align="center">
                      <Flex align="center">
                        <Box w="10px" h="10px" borderRadius="full" bg="blue.400" mr={2} />
                        <Text fontSize="sm">Hypertension</Text>
                      </Flex>
                      <HStack spacing={2}>
                        <Progress 
                          value={24} 
                          size="sm" 
                          w="80px" 
                          colorScheme="blue" 
                          borderRadius="full" 
                        />
                        <Text fontSize="sm" fontWeight="medium" minW="32px" textAlign="right">24%</Text>
                      </HStack>
                    </Flex>
                  </ListItem>
                  <ListItem>
                    <Flex justify="space-between" align="center">
                      <Flex align="center">
                        <Box w="10px" h="10px" borderRadius="full" bg="green.400" mr={2} />
                        <Text fontSize="sm">Diabetes</Text>
                      </Flex>
                      <HStack spacing={2}>
                        <Progress 
                          value={18} 
                          size="sm" 
                          w="80px" 
                          colorScheme="green" 
                          borderRadius="full" 
                        />
                        <Text fontSize="sm" fontWeight="medium" minW="32px" textAlign="right">18%</Text>
                      </HStack>
                    </Flex>
                  </ListItem>
                  <ListItem>
                    <Flex justify="space-between" align="center">
                      <Flex align="center">
                        <Box w="10px" h="10px" borderRadius="full" bg="purple.400" mr={2} />
                        <Text fontSize="sm">Asthma</Text>
                      </Flex>
                      <HStack spacing={2}>
                        <Progress 
                          value={15} 
                          size="sm" 
                          w="80px" 
                          colorScheme="purple" 
                          borderRadius="full" 
                        />
                        <Text fontSize="sm" fontWeight="medium" minW="32px" textAlign="right">15%</Text>
                      </HStack>
                    </Flex>
                  </ListItem>
                  <ListItem>
                    <Flex justify="space-between" align="center">
                      <Flex align="center">
                        <Box w="10px" h="10px" borderRadius="full" bg="orange.400" mr={2} />
                        <Text fontSize="sm">Arthritis</Text>
                      </Flex>
                      <HStack spacing={2}>
                        <Progress 
                          value={12} 
                          size="sm" 
                          w="80px" 
                          colorScheme="orange" 
                          borderRadius="full" 
                        />
                        <Text fontSize="sm" fontWeight="medium" minW="32px" textAlign="right">12%</Text>
                      </HStack>
                    </Flex>
                  </ListItem>
                </List>
              </CardBody>
            </Card>

            {/* Recent Patients */}
            <Card 
              bg={bgColor} 
              shadow="md" 
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderColor}
              overflow="hidden"
              transition="all 0.3s"
              _hover={{ shadow: "lg" }}
            >
              <CardHeader 
                pb={0} 
                bg={useColorModeValue('gray.50', 'gray.700')} 
                borderBottom="1px" 
                borderColor={borderColor}
              >
                <Flex justify="space-between" align="center">
                  <Flex align="center">
                    <Icon as={FiUser} color="blue.500" mr={2} />
                    <Heading size="md">Recent Patients</Heading>
                  </Flex>
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    rightIcon={<FiArrowRight />}
                    as={Link}
                    href="/patients"
                    fontWeight="medium"
                  >
                    View All
                  </Button>
                </Flex>
              </CardHeader>
              <CardBody pt={4}>
                {activePatients.length > 0 ? (
                  <VStack spacing={4} align="stretch">
                    {activePatients.map(patient => (
                      <PatientCard key={patient.id} patient={patient} />
                    ))}
                  </VStack>
                ) : (
                  <Box 
                    p={6} 
                    textAlign="center" 
                    bg={lightBgColor} 
                    borderRadius="md"
                    borderStyle="dashed"
                    borderWidth="2px"
                    borderColor={borderColor}
                  >
                    <Icon as={FiUsers} boxSize={10} color="blue.400" mb={4} opacity={0.6} />
                    <Text mb={3}>No recent patients to display</Text>
                    <Button 
                      colorScheme="blue" 
                      leftIcon={<FiPlus />} 
                      size="sm"
                      boxShadow="sm"
                    >
                      Add New Patient
                    </Button>
                  </Box>
                )}
              </CardBody>
              <CardFooter 
                pt={0} 
                pb={4} 
                px={5}
                bg={useColorModeValue('gray.50', 'gray.700')}
                mt={4}
                borderTop="1px"
                borderColor={borderColor}
              >
                <Button 
                  leftIcon={<FiUsers />} 
                  variant="outline" 
                  colorScheme="blue" 
                  size="sm"
                  w="full"
                  borderRadius="full"
                  _hover={{
                    bg: useColorModeValue('blue.50', 'blue.900'),
                    transform: "translateY(-1px)",
                  }}
                  transition="all 0.2s"
                >
                  Manage Patient Directory
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default DoctorDashboard;
