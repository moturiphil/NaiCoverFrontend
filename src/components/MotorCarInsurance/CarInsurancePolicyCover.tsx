import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/PrograssBar";

interface InsuranceCompany {
  id: string;
  name: string;
  logo: string;
  rating: number;
  available: boolean;
  policyParams?: {
    premiumTiers: {
      min: number;
      max: number;
      rate: number;
    }[];
    excessProtectorRate: number;
    terrorismCoverRate: number;
    iraLevy: number;
    policyFee: number;
    stampDuty: number;
  };
}

const CarPolicy = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] =
    useState<InsuranceCompany | null>(null);
  const fixedInsuredValue = 1000000; // Fixed at KES 1,000,000

  // Insurance companies data - only Jubilee has calculations
  const insuranceCompanies: InsuranceCompany[] = [
    {
      id: "jubilee",
      name: "Jubilee Insurance",
      logo: "/logos/jubilee.png",
      rating: 4.5,
      available: true,
      policyParams: {
        premiumTiers: [
          { min: 0, max: 1000000, rate: 7 },
          { min: 1000000, max: 1500000, rate: 7 },
          { min: 1500000, max: 2000000, rate: 5 },
          { min: 2000000, max: 3000000, rate: 4 },
          { min: 3000000, max: Infinity, rate: 3.5 },
        ],
        excessProtectorRate: 0.25,
        terrorismCoverRate: 0.25,
        iraLevy: 300,
        policyFee: 500,
        stampDuty: 40,
      },
    },
    {
      id: "cic",
      name: "CIC Insurance",
      logo: "/logos/cic.png",
      rating: 4.2,
      available: false,
    },
    {
      id: "britam",
      name: "Britam Insurance",
      logo: "/logos/britam.png",
      rating: 4.3,
      available: false,
    },
    {
      id: "apa",
      name: "APA Insurance",
      logo: "/logos/apa.png",
      rating: 4.1,
      available: false,
    },
    {
      id: "directline",
      name: "Directline Insurance",
      logo: "/logos/directline.png",
      rating: 4.0,
      available: false,
    },
    {
      id: "heritage",
      name: "Heritage Insurance",
      logo: "/logos/heritage.png",
      rating: 3.9,
      available: false,
    },
  ];

  const calculatePremium = (company: InsuranceCompany): number | null => {
    if (!company.available || !company.policyParams) return null;

    const tier = company.policyParams.premiumTiers.find(
      (t) => fixedInsuredValue >= t.min && fixedInsuredValue < t.max
    );
    if (!tier) return null;

    const basePremium = fixedInsuredValue * (tier.rate / 100);
    const excessProtector =
      fixedInsuredValue * (company.policyParams.excessProtectorRate / 100);
    const terrorismCover =
      fixedInsuredValue * (company.policyParams.terrorismCoverRate / 100);

    return (
      basePremium +
      excessProtector +
      terrorismCover +
      company.policyParams.iraLevy +
      company.policyParams.policyFee +
      company.policyParams.stampDuty
    );
  };

  const handleCompanySelect = (company: InsuranceCompany) => {
    if (company.available) {
      setSelectedCompany(company);
    }
  };

  const handleContinue = () => {
    if (selectedCompany) {
      // Save selected company to localStorage or state management
      localStorage.setItem(
        "selectedInsurance",
        JSON.stringify({
          company: selectedCompany,
          insuredValue: fixedInsuredValue,
          totalPremium: calculatePremium(selectedCompany),
        })
      );
      navigate("/insurance/motor-car/payment");
    }
  };

  return (
    <>
      <div className="hidden md:block w-3/8 ml-16">
        <ProgressBar currentStage={3} />
      </div>
      <div className="w-full md:w-5/8 container mx-auto px-4 py-8 bg-white rounded-xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Select Your Insurance Provider
        </h1>
        <p className="text-gray-600 mb-8">
          Compare quotes from our trusted insurance partners for your KES
          1,000,000 vehicle
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {insuranceCompanies.map((company) => {
            const premium = calculatePremium(company);
            return (
              <div
                key={company.id}
                className={`border rounded-xl p-6 transition-all ${
                  company.available
                    ? "cursor-pointer hover:border-gray-300"
                    : "cursor-not-allowed"
                } ${
                  selectedCompany?.id === company.id
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200"
                }`}
                onClick={() => handleCompanySelect(company)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                      {/* <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="h-8 w-8 object-contain"
                      /> */}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {company.name}
                      </h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(company.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">
                          {company.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {company.available ? (
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Annual Premium</p>
                      <p className="text-xl font-bold text-green-600">
                        KES {premium?.toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Not Available
                      </span>
                    </div>
                  )}
                </div>

                {!company.available && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      {company.name} cover is not currently available for your
                      vehicle
                    </p>
                  </div>
                )}

                {selectedCompany?.id === company.id && company.available && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Premium Breakdown
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Base Premium:</span>
                        <span>
                          KES{" "}
                          {(
                            (fixedInsuredValue *
                              (company.policyParams?.premiumTiers.find(
                                (t) =>
                                  fixedInsuredValue >= t.min &&
                                  fixedInsuredValue < t.max
                              )?.rate || 0)) /
                            100
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Excess Protector:</span>
                        <span>
                          KES{" "}
                          {(
                            (fixedInsuredValue *
                              (company.policyParams?.excessProtectorRate ||
                                0)) /
                            100
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Terrorism Cover:</span>
                        <span>
                          KES{" "}
                          {(
                            (fixedInsuredValue *
                              (company.policyParams?.terrorismCoverRate || 0)) /
                            100
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fees & Levies:</span>
                        <span>
                          KES{" "}
                          {(
                            (company.policyParams?.iraLevy || 0) +
                            (company.policyParams?.policyFee || 0) +
                            (company.policyParams?.stampDuty || 0)
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedCompany}
            className={`px-6 py-3 bg-gradient-to-r text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg ${
              selectedCompany
                ? "from-green-600 to-green-800 hover:from-green-700 hover:to-green-900"
                : "from-gray-400 to-gray-600 cursor-not-allowed"
            }`}
          >
            Continue
            <svg
              className="w-4 h-4 ml-2 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default CarPolicy;
