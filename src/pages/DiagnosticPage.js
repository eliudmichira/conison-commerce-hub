import React, { useState, useEffect } from 'react';
import { diagnoseFirebase } from '../firebase-debug';

const DiagnosticPage = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    runDiagnostics();
  }, []);

  const runDiagnostics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Run Firebase diagnostics
      const diagnosticResults = await diagnoseFirebase();
      setResults(diagnosticResults);
      
      // Additional browser diagnostics
      const browserInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        cookiesEnabled: navigator.cookieEnabled,
        online: navigator.onlineEnabled,
        platform: navigator.platform
      };
      
      setResults(prev => ({
        ...prev,
        browserInfo
      }));
      
    } catch (err) {
      console.error('Diagnostic error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Firebase Diagnostics</h1>
      
      <div className="mb-4">
        <button
          onClick={runDiagnostics}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? 'Running...' : 'Run Diagnostics'}
        </button>
      </div>
      
      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      
      {results && (
        <div className="space-y-4">
          <div className="border rounded-md overflow-hidden">
            <div 
              className="bg-gray-100 p-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleExpand('firebase')}
            >
              <h2 className="text-lg font-semibold">Firebase Status</h2>
              <span>{expanded.firebase ? '▼' : '►'}</span>
            </div>
            
            {expanded.firebase && (
              <div className="p-4 bg-white">
                <div className={`p-3 rounded mb-3 ${results.success ? 'bg-green-100' : 'bg-red-100'}`}>
                  {results.success ? 
                    <p className="text-green-800">✅ Firebase is working correctly</p> : 
                    <p className="text-red-800">❌ Firebase initialization failed: {results.error}</p>
                  }
                </div>
                
                <pre className="bg-gray-50 p-3 rounded overflow-auto text-xs">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </div>
            )}
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <div 
              className="bg-gray-100 p-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleExpand('browser')}
            >
              <h2 className="text-lg font-semibold">Browser Information</h2>
              <span>{expanded.browser ? '▼' : '►'}</span>
            </div>
            
            {expanded.browser && results.browserInfo && (
              <div className="p-4 bg-white">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(results.browserInfo).map(([key, value]) => (
                      <tr key={key}>
                        <td className="px-4 py-2 text-gray-500 font-medium">{key}</td>
                        <td className="px-4 py-2">{String(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <div 
              className="bg-gray-100 p-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleExpand('help')}
            >
              <h2 className="text-lg font-semibold">Troubleshooting Steps</h2>
              <span>{expanded.help ? '▼' : '►'}</span>
            </div>
            
            {expanded.help && (
              <div className="p-4 bg-white">
                <ol className="list-decimal list-inside space-y-2">
                  <li>Check that your Firebase configuration is correct (apiKey, authDomain, etc)</li>
                  <li>Verify that Firebase services are enabled in your Firebase console</li>
                  <li>Ensure that your Firestore security rules allow proper access</li>
                  <li>Check if your browser is blocking any scripts or has network issues</li>
                  <li>Look for any CORS issues in the browser console</li>
                  <li>
                    Update your <code>firebase.js</code> file to only import modules you're actually using:
                    <pre className="bg-gray-50 p-2 mt-1 text-xs">
{`import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase config...
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };`}
                    </pre>
                  </li>
                  <li>Clear your browser cache and reload the page</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticPage; 