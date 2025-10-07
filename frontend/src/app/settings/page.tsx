'use client'
import React, { useState } from 'react'
import AppLayout from '@/components/AppLayout'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Slider,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  InputAdornment,
  Tooltip
} from '@mui/material'
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Google as GoogleIcon,
  SmartToy as AIIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Delete as DeleteIcon,
  Logout as LogoutIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Email as EmailIcon
} from '@mui/icons-material'

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function SettingsPage() {
  const [tabValue, setTabValue] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: 'Alex Johnson',
    email: 'alex.johnson@company.com',
    company: 'TechCorp Inc.',
    position: 'Customer Success Manager',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA'
  })
  const [aiSettings, setAiSettings] = useState({
    autoReply: true,
    confidenceLevel: 85,
    tone: 'professional',
    maxResponseLength: 500,
    learningEnabled: true
  })
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    pushNotifications: false,
    dailyDigest: true,
    weeklyReports: true,
    aiSuggestions: true
  })
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    dataEncryption: true,
    auditLogging: true
  })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save profile logic here
    console.log('Saving profile:', profileData)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  const handleAiSettingChange = (setting: string, value: any) => {
    setAiSettings(prev => ({ ...prev, [setting]: value }))
  }

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }))
  }

  const handleSecurityChange = (setting: string, value: any) => {
    setSecuritySettings(prev => ({ ...prev, [setting]: value }))
  }

  // Safe API key display function
  const getDisplayApiKey = () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) return 'Not configured';
    
    if (showApiKey) {
      return apiKey;
    } else {
      // Show only last 4 characters for security
      return '••••••••' + apiKey.slice(-4);
    }
  }

  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Formal and business-appropriate' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
    { value: 'casual', label: 'Casual', description: 'Relaxed and informal' },
    { value: 'enthusiastic', label: 'Enthusiastic', description: 'Energetic and positive' }
  ]

  const integrationStatus = {
    connected: true,
    lastSync: '2024-01-15 14:30',
    emailsProcessed: 1247,
    status: 'active'
  }

  const handleCopyApiKey = async () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (apiKey) {
      try {
        await navigator.clipboard.writeText(apiKey);
        // You could add a toast notification here
        console.log('API key copied to clipboard');
      } catch (err) {
        console.error('Failed to copy API key:', err);
      }
    }
  }

  return (
    <AppLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant={"h4" as any} gutterBottom sx={{ fontWeight: 700 }}>
            Settings & Profile
          </Typography>
          <Typography color="text.secondary">
            Manage your account settings, preferences, and AI configuration
          </Typography>
        </Box>

        {/* Tabs */}
        <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': { fontWeight: 600, textTransform: 'none', fontSize: '0.95rem' }
            }}
          >
            <Tab label="Profile" icon={<EditIcon />} iconPosition="start" />
            <Tab label="AI Settings" icon={<AIIcon />} iconPosition="start" />
            <Tab label="Integrations" icon={<GoogleIcon />} iconPosition="start" />
            <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" />
            <Tab label="Security" icon={<SecurityIcon />} iconPosition="start" />
          </Tabs>

          {/* Profile Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardHeader
                    title="Personal Information"
                    action={
                      isEditing ? (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            startIcon={<CancelIcon />}
                            onClick={handleCancelEdit}
                            variant="outlined"
                            size="small"
                          >
                            Cancel
                          </Button>
                          <Button
                            startIcon={<SaveIcon />}
                            onClick={handleSaveProfile}
                            variant="contained"
                            size="small"
                          >
                            Save Changes
                          </Button>
                        </Box>
                      ) : (
                        <Button
                          startIcon={<EditIcon />}
                          onClick={() => setIsEditing(true)}
                          variant="outlined"
                          size="small"
                        >
                          Edit Profile
                        </Button>
                      )
                    }
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 3 }}>
                      <Box sx={{ position: 'relative' }}>
                        <Avatar
                          sx={{ width: 80, height: 80, fontSize: '2rem' }}
                          src="/profile.jpg"
                        >
                          {profileData.fullName.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                        {isEditing && (
                          <IconButton
                            sx={{
                              position: 'absolute',
                              bottom: -8,
                              right: -8,
                              bgcolor: 'background.paper',
                              boxShadow: 1
                            }}
                            size="small"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Full Name"
                              value={profileData.fullName}
                              onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                              disabled={!isEditing}
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Email"
                              value={profileData.email}
                              disabled
                              variant="outlined"
                              size="small"
                              helperText="Contact support to change email"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Company"
                              value={profileData.company}
                              onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                              disabled={!isEditing}
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Position"
                              value={profileData.position}
                              onChange={(e) => setProfileData(prev => ({ ...prev, position: e.target.value }))}
                              disabled={!isEditing}
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Phone"
                              value={profileData.phone}
                              onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                              disabled={!isEditing}
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Location"
                              value={profileData.location}
                              onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                              disabled={!isEditing}
                              variant="outlined"
                              size="small"
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardHeader title="Account Status" />
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant={"body2" as any} color="text.secondary">
                          Plan Type
                        </Typography>
                        <Chip label="Professional" color="primary" size="small" />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant={"body2" as any} color="text.secondary">
                          Member Since
                        </Typography>
                        <Typography variant={"body2" as any} fontWeight={600}>
                          Jan 2024
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant={"body2" as any} color="text.secondary">
                          Emails Processed
                        </Typography>
                        <Typography variant={"body2" as any} fontWeight={600}>
                          1,247
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant={"body2" as any} color="text.secondary">
                          AI Responses
                        </Typography>
                        <Typography variant={"body2" as any} fontWeight={600}>
                          892
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* AI Settings Tab */}
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardHeader title="AI Response Configuration" />
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <Box>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={aiSettings.autoReply}
                              onChange={(e) => handleAiSettingChange('autoReply', e.target.checked)}
                              color="primary"
                            />
                          }
                          label={
                            <Box>
                              <Typography fontWeight={600}>AI Auto-Reply</Typography>
                              <Typography variant={"body2" as any} color="text.secondary">
                                Automatically generate responses for incoming emails
                              </Typography>
                            </Box>
                          }
                        />
                      </Box>

                      <Box>
                        <Typography gutterBottom fontWeight={600}>
                          Confidence Level
                        </Typography>
                        <Typography variant={"body2" as any} color="text.secondary" gutterBottom>
                          Minimum confidence required for AI to send automatic replies
                        </Typography>
                        <Box sx={{ width: '100%', maxWidth: 400, mt: 2 }}>
                          <Slider
                            value={aiSettings.confidenceLevel}
                            onChange={(e, newValue) => handleAiSettingChange('confidenceLevel', newValue)}
                            valueLabelDisplay="auto"
                            step={5}
                            marks={[
                              { value: 70, label: '70%' },
                              { value: 85, label: '85%' },
                              { value: 100, label: '100%' }
                            ]}
                            min={70}
                            max={100}
                            color="primary"
                          />
                        </Box>
                      </Box>

                      <Box>
                        <Typography gutterBottom fontWeight={600}>
                          Response Tone
                        </Typography>
                        <Typography variant={"body2" as any} color="text.secondary" gutterBottom>
                          Set the tone for AI-generated responses
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                          {toneOptions.map((tone) => (
                            <Chip
                              key={tone.value}
                              label={tone.label}
                              onClick={() => handleAiSettingChange('tone', tone.value)}
                              color={aiSettings.tone === tone.value ? 'primary' : 'default'}
                              variant={aiSettings.tone === tone.value ? 'filled' : 'outlined'}
                              sx={{ mb: 1 }}
                            />
                          ))}
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                          {toneOptions.find(t => t.value === aiSettings.tone)?.description}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography gutterBottom fontWeight={600}>
                          Maximum Response Length
                        </Typography>
                        <Typography variant={"body2" as any} color="text.secondary" gutterBottom>
                          Limit the length of AI-generated responses
                        </Typography>
                        <Box sx={{ width: '100%', maxWidth: 400, mt: 2 }}>
                          <Slider
                            value={aiSettings.maxResponseLength}
                            onChange={(e, newValue) => handleAiSettingChange('maxResponseLength', newValue)}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `${value} chars`}
                            step={50}
                            marks={[
                              { value: 200, label: '200' },
                              { value: 500, label: '500' },
                              { value: 1000, label: '1000' }
                            ]}
                            min={100}
                            max={1000}
                            color="primary"
                          />
                        </Box>
                      </Box>

                      <Box>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={aiSettings.learningEnabled}
                              onChange={(e) => handleAiSettingChange('learningEnabled', e.target.checked)}
                              color="primary"
                            />
                          }
                          label={
                            <Box>
                              <Typography fontWeight={600}>Learning Mode</Typography>
                              <Typography variant={"body2" as any} color="text.secondary">
                                Allow AI to learn from your edits and improve responses over time
                              </Typography>
                            </Box>
                          }
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardHeader title="AI Performance" />
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'success.50', borderRadius: 2 }}>
                        <Typography variant={"h4" as any} fontWeight={700} color="success.main">
                          89%
                        </Typography>
                        <Typography variant={"body2" as any} color="success.main">
                          Response Accuracy
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant={"body2" as any} color="text.secondary" gutterBottom>
                          Approved Responses
                        </Typography>
                        <Typography variant={"h6" as any} fontWeight={600}>
                          742 / 892
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant={"body2" as any} color="text.secondary" gutterBottom>
                          Average Response Time
                        </Typography>
                        <Typography variant={"h6" as any} fontWeight={600}>
                          2.3s
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant={"body2" as any} color="text.secondary" gutterBottom>
                          Learning Progress
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ flex: 1, height: 8, bgcolor: 'grey.200', borderRadius: 4, overflow: 'hidden' }}>
                            <Box sx={{ width: '75%', height: '100%', bgcolor: 'primary.main' }} />
                          </Box>
                          <Typography variant={"body2" as any} fontWeight={600}>
                            75%
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Integrations Tab */}
          <TabPanel value={tabValue} index={2}>
            <Card sx={{ borderRadius: 3 }}>
              <CardHeader title="Email Integrations" />
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Gmail Integration */}
                  <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: '#d93025', width: 48, height: 48 }}>
                          <GoogleIcon />
                        </Avatar>
                        <Box>
                          <Typography variant={"h6" as any} fontWeight={600}>
                            Gmail Integration
                          </Typography>
                          <Typography variant={"body2" as any} color="text.secondary">
                            Connect your Gmail account to enable AI-powered email management
                          </Typography>
                        </Box>
                      </Box>
                      {integrationStatus.connected ? (
                        <Chip label="Connected" color="success" icon={<CheckCircleIcon />} />
                      ) : (
                        <Button
                          variant="contained"
                          startIcon={<GoogleIcon />}
                          sx={{ bgcolor: '#d93025', '&:hover': { bgcolor: '#aa2820' } }}
                        >
                          Connect Gmail
                        </Button>
                      )}
                    </Box>

                    {integrationStatus.connected && (
                      <>
                        <Divider sx={{ my: 2 }} />
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant={"body2" as any} color="text.secondary">
                              Status
                            </Typography>
                            <Typography variant={"body2" as any} fontWeight={600} color="success.main">
                              Active
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant={"body2" as any} color="text.secondary">
                              Last Sync
                            </Typography>
                            <Typography variant={"body2" as any} fontWeight={600}>
                              {integrationStatus.lastSync}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <Typography variant={"body2" as any} color="text.secondary">
                              Emails Processed
                            </Typography>
                            <Typography variant={"body2" as any} fontWeight={600}>
                              {integrationStatus.emailsProcessed}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6} md={3}>
                            <Button variant="outlined" color="error" size="small">
                              Disconnect
                            </Button>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Paper>

                  {/* API Settings - SECURITY FIXED */}
                  <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant={"h6" as any} fontWeight={600} gutterBottom>
                      API Configuration
                    </Typography>
                    <Typography variant={"body2" as any} color="text.secondary" gutterBottom>
                      Manage your API keys and integration settings
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <TextField
                        fullWidth
                        label="OpenAI API Key"
                        type={showApiKey ? 'text' : 'password'}
                        value={getDisplayApiKey()}
                        variant="outlined"
                        size="small"
                        disabled
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton 
                                onClick={() => setShowApiKey(!showApiKey)} 
                                edge="end"
                                disabled={!process.env.NEXT_PUBLIC_OPENAI_API_KEY}
                              >
                                {showApiKey ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        helperText={!process.env.NEXT_PUBLIC_OPENAI_API_KEY ? "API key not configured in environment variables" : ""}
                      />
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Button 
                          variant="outlined" 
                          size="small"
                          onClick={handleCopyApiKey}
                          disabled={!process.env.NEXT_PUBLIC_OPENAI_API_KEY}
                        >
                          Copy Key
                        </Button>
                        <Button 
                          variant="outlined" 
                          size="small" 
                          color="warning"
                          disabled
                        >
                          Regenerate
                        </Button>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        API keys are configured via environment variables for security
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              </CardContent>
            </Card>
          </TabPanel>

          {/* Notifications Tab */}
          <TabPanel value={tabValue} index={3}>
            <Card sx={{ borderRadius: 3 }}>
              <CardHeader title="Notification Preferences" />
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email Alerts"
                      secondary="Receive email notifications for important events"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={notificationSettings.emailAlerts}
                        onChange={(e) => handleNotificationChange('emailAlerts', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Push Notifications"
                      secondary="Get real-time notifications in your browser"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={notificationSettings.pushNotifications}
                        onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <AIIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="AI Suggestions"
                      secondary="Receive notifications for AI-generated response suggestions"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={notificationSettings.aiSuggestions}
                        onChange={(e) => handleNotificationChange('aiSuggestions', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <LanguageIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Daily Digest"
                      secondary="Get a summary of AI activity and performance metrics"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={notificationSettings.dailyDigest}
                        onChange={(e) => handleNotificationChange('dailyDigest', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <PaletteIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Weekly Reports"
                      secondary="Receive detailed weekly performance reports"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={notificationSettings.weeklyReports}
                        onChange={(e) => handleNotificationChange('weeklyReports', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </TabPanel>

          {/* Security Tab */}
          <TabPanel value={tabValue} index={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardHeader title="Security Settings" />
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <Box>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={securitySettings.twoFactorAuth}
                              onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                              color="primary"
                            />
                          }
                          label={
                            <Box>
                              <Typography fontWeight={600}>Two-Factor Authentication</Typography>
                              <Typography variant={"body2" as any} color="text.secondary">
                                Add an extra layer of security to your account
                              </Typography>
                            </Box>
                          }
                        />
                      </Box>

                      <Box>
                        <Typography gutterBottom fontWeight={600}>
                          Session Timeout
                        </Typography>
                        <Typography variant={"body2" as any} color="text.secondary" gutterBottom>
                          Automatically log out after period of inactivity
                        </Typography>
                        <Box sx={{ width: '100%', maxWidth: 400, mt: 2 }}>
                          <Slider
                            value={securitySettings.sessionTimeout}
                            onChange={(e, newValue) => handleSecurityChange('sessionTimeout', newValue)}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `${value} min`}
                            step={15}
                            marks={[
                              { value: 15, label: '15m' },
                              { value: 30, label: '30m' },
                              { value: 60, label: '1h' }
                            ]}
                            min={15}
                            max={120}
                            color="primary"
                          />
                        </Box>
                      </Box>

                      <Box>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={securitySettings.dataEncryption}
                              onChange={(e) => handleSecurityChange('dataEncryption', e.target.checked)}
                              color="primary"
                            />
                          }
                          label={
                            <Box>
                              <Typography fontWeight={600}>Data Encryption</Typography>
                              <Typography variant={"body2" as any} color="text.secondary">
                                Encrypt all stored data and communications
                              </Typography>
                            </Box>
                          }
                        />
                      </Box>

                      <Box>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={securitySettings.auditLogging}
                              onChange={(e) => handleSecurityChange('auditLogging', e.target.checked)}
                              color="primary"
                            />
                          }
                          label={
                            <Box>
                              <Typography fontWeight={600}>Audit Logging</Typography>
                              <Typography variant={"body2" as any} color="text.secondary">
                                Keep detailed logs of all account activity
                              </Typography>
                            </Box>
                          }
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardHeader title="Danger Zone" />
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        These actions are irreversible. Please proceed with caution.
                      </Alert>
                      
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => setDeleteDialog(true)}
                        fullWidth
                      >
                        Delete Account Data
                      </Button>
                      
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<LogoutIcon />}
                        fullWidth
                      >
                        Sign Out All Devices
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </Paper>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialog}
          onClose={() => setDeleteDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Typography variant={"h6" as any} fontWeight={600}>
              Delete Account Data
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete all your account data? This action cannot be undone and will permanently remove:
            </Typography>
            <List dense sx={{ mt: 1 }}>
              <ListItem>
                <ListItemIcon>
                  <WarningIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="All email history and AI responses" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WarningIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Personal preferences and settings" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WarningIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Integration configurations" />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
            <Button onClick={() => setDeleteDialog(false)} color="error" variant="contained">
              Delete All Data
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AppLayout>
  )
}