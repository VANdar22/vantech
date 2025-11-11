import { useState } from 'react';
import { testDatabaseConnection, submitAppointment } from '../services/appointmentService';

const DatabaseTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTestConnection = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await testDatabaseConnection();
      setTestResult(result);
      console.log('Test result:', result);
    } catch (err) {
      console.error('Test failed:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestInsert = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const testData = {
        fullName: 'Test User',
        phone: '1234567890',
        email: 'test@example.com',
        vehicleMake: 'Toyota',
        vehicleModel: 'Camry',
        carNumber: 'ABC123',
        region: 'Test Region',
        branch: 'Test Branch',
        serviceType: 'Test Service',
        appointmentDate: '2025-11-15',
        appointmentTime: '10:00',
      };
      
      console.log('Sending test data:', testData);
      const result = await submitAppointment(testData);
      setTestResult(result);
      console.log('Insert result:', result);
    } catch (err) {
      console.error('Insert test failed:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Database Connection Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleTestConnection}
          disabled={isLoading}
          style={{
            padding: '10px 15px',
            marginRight: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isLoading ? 'Testing...' : 'Test Connection'}
        </button>

        <button 
          onClick={handleTestInsert}
          disabled={isLoading}
          style={{
            padding: '10px 15px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {isLoading ? 'Testing Insert...' : 'Test Insert'}
        </button>
      </div>

      {error && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#ffebee', 
          color: '#d32f2f', 
          margin: '10px 0',
          borderRadius: '4px'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {testResult && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#e8f5e9', 
          margin: '10px 0',
          borderRadius: '4px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all'
        }}>
          <strong>Result:</strong> {JSON.stringify(testResult, null, 2)}
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p><strong>Note:</strong> Check the browser console for detailed logs.</p>
      </div>
    </div>
  );
};

export default DatabaseTest;
