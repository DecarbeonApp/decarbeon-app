"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import {
  Box,
  Container,
  Typography,
  Card,
  Tabs,
  Tab,
  Paper
} from "@mui/material";
import EnergyMetrics from "./components/EnergyMetrics";
import CarbonMetrics from "./components/CarbonMetrics";
import WaterMetrics from "./components/WaterMetrics";
import WasteMetrics from "./components/WasteMetrics";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  );
}

export default function SustainabilityMetricsCalculator() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box component="div" className={styles.container}>
      <Box
        component="header"
        sx={{
          bgcolor: "white",
          py: 1.5,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/decarbeon-logo.png"
              alt="Decarbeon"
              width={120}
              height={32}
              priority
            />
          </Box>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              color: "#2D6A4F",
              textAlign: "center",
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
            Sustainability Metrics
          </Typography>
          <Box sx={{ width: 120 }} /> {/* Spacer for alignment */}
        </Container>
      </Box>

      <Container maxWidth="xl">
        <Paper elevation={0} className={styles.tabContainer} sx={{ bgcolor: '#f5f5f5' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="metric tabs"
            sx={{
              "& .MuiTab-root": {
                fontWeight: "bold",
                color: "#666",
                "&.Mui-selected": {
                  color: "#2D6A4F",
                  backgroundColor: "rgba(45, 106, 79, 0.2)",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#2D6A4F",
              },
            }}
          >
            <Tab label="Energy Metrics" />
            <Tab label="Carbon Metrics" />
            <Tab label="Water Management" />
            <Tab label="Waste Management" />
          </Tabs>
        </Paper>

        <TabPanel value={activeTab} index={0}>
          <Card className={styles.formSection}>
            <div
              style={{
                padding: "12px 24px",
                backgroundColor: "#e8f5e9",
                borderRadius: "8px 8px 0 0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="#2c6e49"
                >
                  Energy Consumption Data
                </Typography>
                <Typography variant="caption" color="#2c6e49">
                  Monitor and analyze energy consumption patterns
                </Typography>
              </Box>
            </div>
            <EnergyMetrics />
          </Card>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Card className={styles.formSection}>
            <div
              style={{
                padding: "12px 24px",
                backgroundColor: "#e8f5e9",
                borderRadius: "8px 8px 0 0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="#2c6e49"
                >
                  Carbon Emissions Data
                </Typography>
                <Typography variant="caption" color="#2c6e49">
                  Track and analyze carbon emissions across all scopes
                </Typography>
              </Box>
            </div>
            <CarbonMetrics />
          </Card>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Card className={styles.formSection}>
            <div
              style={{
                padding: "12px 24px",
                backgroundColor: "#e8f5e9",
                borderRadius: "8px 8px 0 0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="#2c6e49"
                >
                  Water Usage Data
                </Typography>
                <Typography variant="caption" color="#2c6e49">
                  Monitor water usage and conservation efforts
                </Typography>
              </Box>
            </div>
            <WaterMetrics />
          </Card>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Card className={styles.formSection}>
            <div
              style={{
                padding: "12px 24px",
                backgroundColor: "#e8f5e9",
                borderRadius: "8px 8px 0 0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="#2c6e49"
                >
                  Waste Management Data
                </Typography>
                <Typography variant="caption" color="#2c6e49">
                  Track waste generation and recycling metrics
                </Typography>
              </Box>
            </div>
            <WasteMetrics />
          </Card>
        </TabPanel>
      </Container>
    </Box>
  );
}
