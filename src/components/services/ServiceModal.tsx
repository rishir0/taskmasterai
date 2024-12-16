import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';
import { Button } from '../Button';
import type { Service } from '../../data/services';
import { Link } from 'react-router-dom';

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.3,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  if (!service) return null;

  const Icon = service.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b relative">
            <motion.button
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
              onClick={onClose}
              whileHover={{ rotate: 90 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
            <motion.div variants={contentVariants} className="flex items-center gap-4">
              <span className="rounded-lg inline-flex p-3 bg-[#E0F0FF] text-[#002B5B]">
                <Icon className="h-8 w-8" />
              </span>
              <h2 className="text-2xl font-bold text-[#002B5B]">{service.title}</h2>
            </motion.div>
          </div>

          <div className="p-6 space-y-6">
            <motion.div variants={contentVariants}>
              <h3 className="text-lg font-semibold text-[#002B5B] mb-3">Overview</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>

            <motion.div variants={contentVariants}>
              <h3 className="text-lg font-semibold text-[#002B5B] mb-3">Key Features</h3>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-gray-600"
                  >
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={contentVariants}>
              <h3 className="text-lg font-semibold text-[#002B5B] mb-3">Process</h3>
              <div className="space-y-4">
                {service.process?.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#E0F0FF] text-[#002B5B] flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-[#002B5B]">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={contentVariants} className="flex gap-4">
              <Link to="/consultation">
                <Button className="whitespace-nowrap">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" onClick={onClose} className="whitespace-nowrap">
                Close
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
