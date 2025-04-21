import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { FaSave, FaCog } from 'react-icons/fa';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyAddress: '',
    paymentOptions: {
      paystack: true,
      bankTransfer: false,
      cash: false
    },
    emailNotifications: {
      newQuote: true,
      newPayment: true,
      projectUpdate: true
    },
    defaultCurrency: 'NGN',
    taxRate: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const settingsDoc = await getDoc(doc(db, 'settings', 'appSettings'));
      
      if (settingsDoc.exists()) {
        setSettings(settingsDoc.data());
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      await updateDoc(doc(db, 'settings', 'appSettings'), settings);
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Settings</h1>
        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="flex items-center px-4 py-2 bg-conison-magenta text-white rounded-md hover:bg-conison-magenta-dark focus:outline-none focus:ring-2 focus:ring-conison-magenta"
        >
          {saving ? (
            <>Saving...</>
          ) : (
            <>
              <FaSave className="mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'general'
                ? 'text-conison-magenta border-b-2 border-conison-magenta'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'payment'
                ? 'text-conison-magenta border-b-2 border-conison-magenta'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Payment
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'notifications'
                ? 'text-conison-magenta border-b-2 border-conison-magenta'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Notifications
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={settings.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-conison-magenta focus:border-conison-magenta dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Email
                </label>
                <input
                  type="email"
                  name="companyEmail"
                  value={settings.companyEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-conison-magenta focus:border-conison-magenta dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Phone
                </label>
                <input
                  type="text"
                  name="companyPhone"
                  value={settings.companyPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-conison-magenta focus:border-conison-magenta dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company Address
                </label>
                <textarea
                  name="companyAddress"
                  value={settings.companyAddress}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-conison-magenta focus:border-conison-magenta dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Default Currency
                </label>
                <select
                  name="defaultCurrency"
                  value={settings.defaultCurrency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-conison-magenta focus:border-conison-magenta dark:bg-gray-700 dark:text-white"
                >
                  <option value="NGN">Nigerian Naira (NGN)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="GBP">British Pound (GBP)</option>
                  <option value="EUR">Euro (EUR)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  name="taxRate"
                  value={settings.taxRate}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-conison-magenta focus:border-conison-magenta dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-6">
                <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Payment Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="paystack"
                      checked={settings.paymentOptions.paystack}
                      onChange={(e) => handleNestedInputChange('paymentOptions', 'paystack', e.target.checked)}
                      className="h-4 w-4 text-conison-magenta focus:ring-conison-magenta border-gray-300 rounded"
                    />
                    <label htmlFor="paystack" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Paystack (Credit/Debit Card)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="bankTransfer"
                      checked={settings.paymentOptions.bankTransfer}
                      onChange={(e) => handleNestedInputChange('paymentOptions', 'bankTransfer', e.target.checked)}
                      className="h-4 w-4 text-conison-magenta focus:ring-conison-magenta border-gray-300 rounded"
                    />
                    <label htmlFor="bankTransfer" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Bank Transfer
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="cash"
                      checked={settings.paymentOptions.cash}
                      onChange={(e) => handleNestedInputChange('paymentOptions', 'cash', e.target.checked)}
                      className="h-4 w-4 text-conison-magenta focus:ring-conison-magenta border-gray-300 rounded"
                    />
                    <label htmlFor="cash" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Cash
                    </label>
                  </div>
                </div>
              </div>
              
              {settings.paymentOptions.paystack && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Paystack Settings</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Configure your Paystack payment gateway settings.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Public Key
                      </label>
                      <input
                        type="text"
                        name="paystackPublicKey"
                        value={settings.paystackPublicKey || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-conison-magenta focus:border-conison-magenta dark:bg-gray-700 dark:text-white"
                        placeholder="pk_test_..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Secret Key
                      </label>
                      <input
                        type="password"
                        name="paystackSecretKey"
                        value={settings.paystackSecretKey || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-conison-magenta focus:border-conison-magenta dark:bg-gray-700 dark:text-white"
                        placeholder="sk_test_..."
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {settings.paymentOptions.bankTransfer && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                  <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Bank Transfer Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        name="bankName"
                        value={settings.bankName || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-conison-magenta focus:border-conison-magenta dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Account Name
                      </label>
                      <input
                        type="text"
                        name="accountName"
                        value={settings.accountName || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-conison-magenta focus:border-conison-magenta dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Account Number
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={settings.accountNumber || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-conison-magenta focus:border-conison-magenta dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Email Notifications</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newQuote"
                    checked={settings.emailNotifications.newQuote}
                    onChange={(e) => handleNestedInputChange('emailNotifications', 'newQuote', e.target.checked)}
                    className="h-4 w-4 text-conison-magenta focus:ring-conison-magenta border-gray-300 rounded"
                  />
                  <label htmlFor="newQuote" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    New quote requests
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newPayment"
                    checked={settings.emailNotifications.newPayment}
                    onChange={(e) => handleNestedInputChange('emailNotifications', 'newPayment', e.target.checked)}
                    className="h-4 w-4 text-conison-magenta focus:ring-conison-magenta border-gray-300 rounded"
                  />
                  <label htmlFor="newPayment" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    New payments
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="projectUpdate"
                    checked={settings.emailNotifications.projectUpdate}
                    onChange={(e) => handleNestedInputChange('emailNotifications', 'projectUpdate', e.target.checked)}
                    className="h-4 w-4 text-conison-magenta focus:ring-conison-magenta border-gray-300 rounded"
                  />
                  <label htmlFor="projectUpdate" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    Project updates
                  </label>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Email Templates</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Configure the email templates sent to clients for various events.
                </p>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-md">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Quote Confirmation</h4>
                    <textarea
                      name="quoteEmailTemplate"
                      value={settings.quoteEmailTemplate || 'Thank you for requesting a quote. We will review your requirements and get back to you shortly.'}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-conison-magenta focus:border-conison-magenta dark:bg-gray-700 dark:text-white"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Use {'{name}'} for client name, {'{quote_id}'} for quote ID, and {'{amount}'} for quote amount.
                    </p>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-md">
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Payment Confirmation</h4>
                    <textarea
                      name="paymentEmailTemplate"
                      value={settings.paymentEmailTemplate || 'Thank you for your payment. Your transaction has been processed successfully.'}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-conison-magenta focus:border-conison-magenta dark:bg-gray-700 dark:text-white"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Use {'{name}'} for client name, {'{transaction_id}'} for transaction ID, and {'{amount}'} for payment amount.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 