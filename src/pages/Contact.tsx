/*
 * Copyright 2025 Rational Ventures Inc.
 * RATIONAL VENTURES INC PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF RATIONAL VENTURES INC.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import functions from '@/lib/shared/kliv-functions.js';

export function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: t('contact.validation.missingFields'),
        description: t('contact.validation.pleaseFillOutAll'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await functions.post('contact', formData);

      toast({
        title: t('contact.success.title'),
        description: t('contact.success.description'),
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      toast({
        title: t('contact.error.title'),
        description: t('contact.error.description'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Header */}
        <div className="border-b border-border/50 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-6 backdrop-blur-sm">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm font-semibold text-primary">{t('contact.badge')}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-[1.1]">
                <span className="text-gradient">
                  {t('contact.title')}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t('contact.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="border border-border/50 bg-card/80 dark:bg-card/60 backdrop-blur-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {t('contact.formTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('contact.nameLabel')} {t('contact.required')}</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder={t('contact.namePlaceholder')}
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('contact.emailLabel')} {t('contact.required')}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t('contact.emailPlaceholder')}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">{t('contact.subjectLabel')} {t('contact.required')}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder={t('contact.subjectPlaceholder')}
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('contact.messageLabel')} {t('contact.required')}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder={t('contact.messagePlaceholder')}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      rows={6}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? t('contact.submit.sending') : t('contact.submit.sendMessage')}
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-border/50">
                  <p className="text-sm text-muted-foreground text-center">
                    {t('contact.alternativeContact')}{' '}
                    <a 
                      href="mailto:hello@kliv.dev" 
                      className="text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      hello@kliv.dev
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}