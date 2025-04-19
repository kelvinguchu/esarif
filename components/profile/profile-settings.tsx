"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  Bell,
  Save,
  Check,
  Globe,
  DollarSign,
  Clock,
  Smartphone,
  Mail,
  ShieldAlert,
  BellRing,
  FileText,
  Info,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProfileSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [newDeviceAlerts, setNewDeviceAlerts] = useState(true);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("EAT");
  const [activeTab, setActiveTab] = useState("notifications");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const handleSave = () => {
    setSaveStatus("saving");
    // Simulate API call
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  return (
    <Card className='border border-gray-200 shadow-sm bg-white'>
      <CardHeader className='bg-gray-50 px-5 py-4 border-b border-gray-200'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg text-gray-800'>
            Account Preferences
          </CardTitle>
          <div className='flex items-center gap-2.5'>
            <Bell className='h-5 w-5 text-gray-500' />
          </div>
        </div>
      </CardHeader>
      <CardContent className='p-0'>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className='px-5 pt-4'>
            <TabsList className='h-8 p-0.5 bg-gray-200/70'>
              <TabsTrigger
                value='notifications'
                className='px-3 py-1 h-7 text-xs data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm'>
                <Bell className='h-3.5 w-3.5 mr-1.5' />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value='regional'
                className='px-3 py-1 h-7 text-xs data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm'>
                <Globe className='h-3.5 w-3.5 mr-1.5' />
                Regional
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='notifications' className='m-0'>
            <div className='p-5 space-y-6'>
              <div className='space-y-1.5 mb-4'>
                <h3 className='text-sm font-medium text-gray-700 flex items-center mb-1'>
                  <Bell className='h-4 w-4 mr-1.5 text-primary' />
                  Notification Preferences
                </h3>
                <p className='text-xs text-gray-500'>
                  Control how and when you receive notifications from e-Sarif
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <NotificationSetting
                  id='email-notifications'
                  icon={<Mail className='h-4 w-4 text-blue-500' />}
                  title='Email Notifications'
                  description='Receive important updates via email'
                  checked={emailNotifications}
                  onChange={setEmailNotifications}
                />

                <NotificationSetting
                  id='sms-notifications'
                  icon={<Smartphone className='h-4 w-4 text-green-500' />}
                  title='SMS Notifications'
                  description='Get alerts via text message'
                  checked={smsNotifications}
                  onChange={setSmsNotifications}
                />

                <NotificationSetting
                  id='transaction-alerts'
                  icon={<DollarSign className='h-4 w-4 text-purple-500' />}
                  title='Transaction Alerts'
                  description='Be notified about transactions'
                  checked={transactionAlerts}
                  onChange={setTransactionAlerts}
                />

                <NotificationSetting
                  id='security-alerts'
                  icon={<ShieldAlert className='h-4 w-4 text-red-500' />}
                  title='Security Alerts'
                  description='Get notified about security events'
                  checked={securityAlerts}
                  onChange={setSecurityAlerts}
                />

                <NotificationSetting
                  id='new-device-alerts'
                  icon={<BellRing className='h-4 w-4 text-amber-500' />}
                  title='New Device Logins'
                  description='Alert when a new device accesses your account'
                  checked={newDeviceAlerts}
                  onChange={setNewDeviceAlerts}
                />

                <NotificationSetting
                  id='marketing-emails'
                  icon={<FileText className='h-4 w-4 text-gray-500' />}
                  title='Marketing Emails'
                  description='Receive promotional content and offers'
                  checked={marketingEmails}
                  onChange={setMarketingEmails}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value='regional' className='m-0'>
            <div className='p-5 space-y-6'>
              <div className='space-y-1.5 mb-4'>
                <h3 className='text-sm font-medium text-gray-700 flex items-center mb-1'>
                  <Globe className='h-4 w-4 mr-1.5 text-primary' />
                  Regional Settings
                </h3>
                <p className='text-xs text-gray-500'>
                  Customize your experience based on your location and
                  preferences
                </p>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                <div className='space-y-2 p-3 rounded-lg border border-gray-100 bg-gray-50/50'>
                  <div className='flex items-center mb-1'>
                    <Info className='h-4 w-4 mr-1.5 text-blue-500' />
                    <Label
                      htmlFor='language'
                      className='text-gray-700 font-medium'>
                      Language
                    </Label>
                  </div>
                  <p className='text-xs text-gray-500 mb-2'>
                    Choose your preferred language
                  </p>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger
                      id='language'
                      className='bg-white border-gray-200'>
                      <SelectValue placeholder='Select language' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='en'>English</SelectItem>
                      <SelectItem value='so'>Somali</SelectItem>
                      <SelectItem value='ar'>Arabic</SelectItem>
                      <SelectItem value='sw'>Swahili</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2 p-3 rounded-lg border border-gray-100 bg-gray-50/50'>
                  <div className='flex items-center mb-1'>
                    <DollarSign className='h-4 w-4 mr-1.5 text-green-500' />
                    <Label
                      htmlFor='currency'
                      className='text-gray-700 font-medium'>
                      Currency
                    </Label>
                  </div>
                  <p className='text-xs text-gray-500 mb-2'>
                    Default currency for transactions
                  </p>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger
                      id='currency'
                      className='bg-white border-gray-200'>
                      <SelectValue placeholder='Select currency' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='USD'>USD ($)</SelectItem>
                      <SelectItem value='SOS'>Somali Shilling (SOS)</SelectItem>
                      <SelectItem value='KES'>Kenyan Shilling (KES)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2 p-3 rounded-lg border border-gray-100 bg-gray-50/50'>
                  <div className='flex items-center mb-1'>
                    <Clock className='h-4 w-4 mr-1.5 text-purple-500' />
                    <Label
                      htmlFor='timezone'
                      className='text-gray-700 font-medium'>
                      Timezone
                    </Label>
                  </div>
                  <p className='text-xs text-gray-500 mb-2'>
                    Set your local timezone
                  </p>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger
                      id='timezone'
                      className='bg-white border-gray-200'>
                      <SelectValue placeholder='Select timezone' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='EAT'>
                        East Africa Time (GMT+3)
                      </SelectItem>
                      <SelectItem value='GMT'>
                        Greenwich Mean Time (GMT)
                      </SelectItem>
                      <SelectItem value='UTC'>
                        Universal Time Coordinated (UTC)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <div className='p-5 pt-0 flex justify-end border-t border-gray-100 mt-5'>
            <Button
              className={`
                ${
                  saveStatus === "idle" ? "bg-primary hover:bg-primary/90" : ""
                } 
                ${saveStatus === "saving" ? "bg-gray-400" : ""}
                ${saveStatus === "saved" ? "bg-green-500" : ""}
              `}
              onClick={handleSave}
              disabled={saveStatus === "saving"}>
              {saveStatus === "idle" && (
                <>
                  <Save className='h-4 w-4 mr-2' />
                  Save Changes
                </>
              )}
              {saveStatus === "saving" && "Saving..."}
              {saveStatus === "saved" && (
                <>
                  <Check className='h-4 w-4 mr-2' />
                  Saved
                </>
              )}
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Helper component for notification settings
function NotificationSetting({
  id,
  icon,
  title,
  description,
  checked,
  onChange,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div
      className={`p-3 border rounded-lg flex items-start justify-between ${
        checked
          ? "bg-primary/5 border-primary/20"
          : "bg-gray-50 border-gray-200"
      }`}>
      <div className='flex gap-3'>
        <div className='mt-0.5'>{icon}</div>
        <div>
          <Label htmlFor={id} className='text-gray-700 font-medium'>
            {title}
          </Label>
          <p className='text-xs text-gray-500 mt-0.5'>{description}</p>
        </div>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
