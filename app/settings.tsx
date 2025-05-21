import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getSettings, saveSettings } from '../Intermediate/settings';

export default function SettingsPage() {
  const [intervals, setIntervals] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);
      const settings = await getSettings();
      setIntervals(settings.intervals?.toString() || '');
      setLoading(false);
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await saveSettings({ intervals: Number(intervals) });
    setSaving(false);
    alert('Settings saved!');
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Notification Interval (ms):</Text>
      <TextInput
        style={styles.input}
        value={intervals}
        onChangeText={setIntervals}
        keyboardType="numeric"
      />
      <Button title={saving ? 'Saving...' : 'Save'} onPress={handleSave} disabled={saving} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, width: 200, marginBottom: 20 },
});
